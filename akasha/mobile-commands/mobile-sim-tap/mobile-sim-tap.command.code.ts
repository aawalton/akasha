import type { Answer } from "@akasha/command-system/calling"
import { clickElement, findElement, tapCoordinates } from "@akasha/mobile-cli/appium-client"
import {
  answering,
  countOf,
  driving,
  flagsAloneIn,
  type Reading,
  refusedBy,
  told,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

const SELECTOR = "--selector"

const X = "--x"

const Y = "--y"

const BY_CSS = "css selector"

const VALUED = [SELECTOR, X, Y]

export type Read = { readonly selector: string } | { readonly x: number; readonly y: number }

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, [])
  if ("refused" in said) return said
  const loose = flagsAloneIn(said)
  if (loose.length > 0) return { refused: loose }

  const selector = said.named[SELECTOR]
  const acrossSaid = said.named[X]
  const downSaid = said.named[Y]

  if (selector !== undefined && (acrossSaid !== undefined || downSaid !== undefined)) {
    return {
      refused: [
        `\`${SELECTOR}\` names an element and \`${X}\`/\`${Y}\` name a point, and one call taps one of them`,
      ],
    }
  }
  if (selector !== undefined) return { selector }

  if (acrossSaid === undefined || downSaid === undefined) {
    return {
      refused: [
        `this taps what \`${SELECTOR}\` names or the point \`${X}\` and \`${Y}\` name, and nothing named either`,
      ],
    }
  }
  const across = countOf(acrossSaid, X)
  if (typeof across !== "number") {
    return across === null
      ? { refused: [`\`${X}\` names a point across, and nothing did`] }
      : across
  }
  const down = countOf(downSaid, Y)
  if (typeof down !== "number") {
    return down === null ? { refused: [`\`${Y}\` names a point down, and nothing did`] } : down
  }
  return { x: across, y: down }
}

async function tapped(read: Read): Promise<Answer> {
  const state = await driving()
  if ("selector" in read) {
    const elementId = await findElement(state.appiumBase, state.sessionId, BY_CSS, read.selector)
    await clickElement(state.appiumBase, state.sessionId, elementId)
    return told([`tapped\t${read.selector}`])
  }
  await tapCoordinates(state.appiumBase, state.sessionId, read.x, read.y)
  return told([`tapped\t(${read.x}, ${read.y})`])
}

export async function mobileSimTap(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await tapped(read))
}
