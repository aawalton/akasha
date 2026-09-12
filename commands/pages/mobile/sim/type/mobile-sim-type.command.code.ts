import {
  activeElement,
  clickElement,
  elementSendKeys,
  findElement,
} from "akasha/alan/harness/mobile-cli/appium-client/appium-client.module.code.ts"
import type { SimSessionState } from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import {
  answering,
  flagsAloneIn,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import {
  driving,
  type Reading,
  wordsIn,
} from "akasha/commands/pages/mobile/mobile-answering/mobile-answering.module.code.ts"

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

export async function mobileSimType(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => await typedIn(read, done))
}
