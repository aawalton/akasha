import {
  activeElement,
  clickElement,
  elementSendKeys,
  findElement,
} from "akasha/alan/harness/mobile-cli/appium-client/appium-client.module.code.ts"
import { driving } from "akasha/alan/harness/mobile-cli/sim-driver/sim-driver.module.code.ts"
import type { SimSessionState } from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { selector as selectorArgument } from "akasha/commands/arguments/pages/selector.argument.ts"
import { typedText } from "akasha/commands/arguments/pages/typed-text.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Piping } from "akasha/commands/modules/piping/piping.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"

import { mobileSimType as page } from "akasha/commands/pages/mobile/sim/type/mobile-sim-type.command.ts"

const PIPED = "-"

const BY_CSS = "css selector"

export type Reading<T> = T | { readonly refused: readonly string[] }

export type Read = {
  readonly text: string
  readonly selector: string | undefined
}

export function textIn(
  wanted: string,
  named: string | undefined,
  piping: Piping = inputIn
): Reading<Read> {
  if (wanted !== PIPED) return { text: wanted, selector: named }
  const held = piping()
  if ("tty" in held) {
    return {
      refused: [
        `\`${typedText.said} ${PIPED}\` reads the text from what is piped in, and nothing was`,
      ],
    }
  }
  if ("unreadable" in held) return { refused: [held.unreadable] }
  if (held.bytes.byteLength === 0) {
    return { refused: [`\`${typedText.said} ${PIPED}\` was piped nothing to type`] }
  }
  return { text: new TextDecoder().decode(held.bytes), selector: named }
}

export type Typing = {
  readonly state: (done: string[]) => Promise<SimSessionState>
  readonly focused: (base: string, sessionId: string) => Promise<string>
  readonly found: (base: string, sessionId: string, by: string, said: string) => Promise<string>
  readonly tapped: (base: string, sessionId: string, elementId: string) => Promise<unknown>
  readonly typed: (
    base: string,
    sessionId: string,
    elementId: string,
    text: string
  ) => Promise<unknown>
}

export const TYPING: Typing = {
  state: driving,
  focused: activeElement,
  found: findElement,
  tapped: clickElement,
  typed: elementSendKeys,
}

export function tappedSaid(selector: string): string {
  return `tapped ${selector}, which is focused with nothing typed into it`
}

export async function typedIn(
  read: Read,
  done: string[],
  typing: Typing = TYPING
): Promise<Answer> {
  const state = await typing.state(done)
  const selector = read.selector
  if (selector === undefined) {
    const focused = await typing.focused(state.appiumBase, state.sessionId)
    await typing.typed(state.appiumBase, state.sessionId, focused, read.text)
    return told([`typed\t${read.text.length} characters into what was focused`])
  }
  const elementId = await typing.found(state.appiumBase, state.sessionId, BY_CSS, selector)
  await typing.tapped(state.appiumBase, state.sessionId, elementId)
  done.push(tappedSaid(selector))
  await typing.typed(state.appiumBase, state.sessionId, elementId, read.text)
  return told([`typed\t${read.text.length} characters into ${selector}`])
}

export async function mobileSimType(argv: readonly string[], given: Given): Promise<Answer> {
  const said = takenFor(argv, given.calledAs, page, [selectorArgument, typedText])
  if ("refused" in said) return refusedBy(said.refused)
  const read = textIn(said.taken.typedText, said.taken.selector)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => await typedIn(read, done))
}
