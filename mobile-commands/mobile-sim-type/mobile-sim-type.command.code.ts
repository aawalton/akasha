import type { Answer } from "@akasha/command-system/calling"
import { inputIn } from "@akasha/command-system/piping"
import {
  activeElement,
  clickElement,
  elementSendKeys,
  findElement,
} from "@akasha/mobile-cli/appium-client"
import {
  answering,
  driving,
  flagsAloneIn,
  type Reading,
  refusedBy,
  told,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

const TEXT = "--text"

const SELECTOR = "--selector"

const PIPED = "-"

const BY_CSS = "css selector"

const VALUED = [TEXT, SELECTOR]

export type Read = {
  readonly text: string
  readonly selector: string | undefined
}

function pipedText(): Reading<string> {
  const held = inputIn()
  if ("tty" in held) {
    return {
      refused: [`\`${TEXT} ${PIPED}\` reads the text from what is piped in, and nothing was`],
    }
  }
  if ("unreadable" in held) return { refused: [held.unreadable] }
  if (held.bytes.byteLength === 0) {
    return { refused: [`\`${TEXT} ${PIPED}\` was piped nothing to type`] }
  }
  return new TextDecoder().decode(held.bytes)
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, [])
  if ("refused" in said) return said
  const loose = flagsAloneIn(said)
  if (loose.length > 0) return { refused: loose }
  const wanted = said.named[TEXT]
  if (wanted === undefined) {
    return { refused: [`\`${TEXT}\` names what to type, and nothing did`] }
  }
  const selector = said.named[SELECTOR]
  if (wanted !== PIPED) return { text: wanted, selector }
  const piped = pipedText()
  if (typeof piped !== "string") return piped
  return { text: piped, selector }
}

async function typed(read: Read): Promise<Answer> {
  const state = await driving()
  const selector = read.selector
  if (selector === undefined) {
    const focused = await activeElement(state.appiumBase, state.sessionId)
    await elementSendKeys(state.appiumBase, state.sessionId, focused, read.text)
    return told([`typed\t${read.text.length} characters into what was focused`])
  }
  const elementId = await findElement(state.appiumBase, state.sessionId, BY_CSS, selector)
  await clickElement(state.appiumBase, state.sessionId, elementId)
  await elementSendKeys(state.appiumBase, state.sessionId, elementId, read.text)
  return told([`typed\t${read.text.length} characters into ${selector}`])
}

export async function mobileSimType(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await typed(read))
}
