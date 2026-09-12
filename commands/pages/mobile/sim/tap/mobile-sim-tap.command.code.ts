import {
  clickElement,
  findElement,
  tapCoordinates,
} from "akasha/alan/harness/mobile-cli/appium-client/appium-client.module.code.ts"
import { driving } from "akasha/alan/harness/mobile-cli/sim-driver/sim-driver.module.code.ts"
import type { SimSessionState } from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { selector as selectorArgument } from "akasha/commands/arguments/pages/selector.argument.ts"
import { x as xArgument } from "akasha/commands/arguments/pages/x.argument.ts"
import { y as yArgument } from "akasha/commands/arguments/pages/y.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

import { mobileSimTap as page } from "akasha/commands/pages/mobile/sim/tap/mobile-sim-tap.command.ts"

const BY_CSS = "css selector"

export type Reading<T> = T | { readonly refused: readonly string[] }

export type Read = { readonly selector: string } | { readonly x: number; readonly y: number }

function pointedAt(
  named: string | undefined,
  across: number | undefined,
  down: number | undefined
): Reading<Read> {
  if (named !== undefined) return { selector: named }
  if (across === undefined || down === undefined) {
    return {
      refused: [
        `this taps what \`${selectorArgument.said}\` names or the point ` +
          `\`${xArgument.said}\` and \`${yArgument.said}\` name, and nothing named either`,
      ],
    }
  }
  return { x: across, y: down }
}

export type Tapping = (done: string[], read: Read) => Promise<Answer>

export type Touching = {
  readonly state: (done: string[]) => Promise<SimSessionState>
  readonly found: (base: string, sessionId: string, by: string, said: string) => Promise<string>
  readonly clicked: (base: string, sessionId: string, elementId: string) => Promise<unknown>
  readonly pointed: (base: string, sessionId: string, x: number, y: number) => Promise<unknown>
}

const TOUCHING: Touching = {
  state: driving,
  found: findElement,
  clicked: clickElement,
  pointed: tapCoordinates,
}

export function sentSaid(at: string): string {
  return `sent a tap to ${at}, which may have taken it`
}

export async function tapped(
  done: string[],
  read: Read,
  touching: Touching = TOUCHING
): Promise<Answer> {
  const state = await touching.state(done)
  if ("selector" in read) {
    const elementId = await touching.found(state.appiumBase, state.sessionId, BY_CSS, read.selector)
    done.push(sentSaid(read.selector))
    await touching.clicked(state.appiumBase, state.sessionId, elementId)
    return told([`tapped\t${read.selector}`])
  }
  const at = `(${read.x}, ${read.y})`
  done.push(sentSaid(at))
  await touching.pointed(state.appiumBase, state.sessionId, read.x, read.y)
  return told([`tapped\t${at}`])
}

export async function mobileSimTap(
  argv: readonly string[],
  given: Given,
  tapping: Tapping = tapped
): Promise<Answer> {
  const said = takenFor(argv, given.calledAs, page, [xArgument, yArgument, selectorArgument])
  if ("refused" in said) return refusedBy(said.refused)
  const read = pointedAt(said.taken.selector, said.taken.x, said.taken.y)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => await tapping(done, read))
}
