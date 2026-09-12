import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { SimSessionState } from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import {
  answering,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type {
  Read,
  Typing,
} from "akasha/commands/pages/mobile/sim/type/mobile-sim-type.command.code.ts"
import {
  mobileSimType,
  sentSaid,
  tappedSaid,
  textIn,
  typedIn,
} from "akasha/commands/pages/mobile/sim/type/mobile-sim-type.command.code.ts"

const SELECTOR = "#password"

const CALLED_AS = "akasha mobile sim type"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: CALLED_AS,
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const PIPED_TEXT = { bytes: new TextEncoder().encode("hunter2") }

const PIPED_NOTHING = { bytes: new Uint8Array() }

const TAPPED = tappedSaid(SELECTOR)

const READ: Read = { text: "hunter2", selector: SELECTOR }

const FOCUSED: Read = { text: "hunter2", selector: undefined }

const SENT = sentSaid(READ.text.length, SELECTOR)

const SENT_FOCUSED = sentSaid(FOCUSED.text.length, "the element already focused")

const STATE = { appiumBase: "http://mac:4723", sessionId: "3f0c9a11" } as SimSessionState

function typing(over: Partial<Typing> = {}): Typing {
  return {
    state: () => Promise.resolve(STATE),
    focused: () => Promise.resolve("the-element-in-focus"),
    found: () => Promise.resolve("the-element-named"),
    tapped: () => Promise.resolve(undefined),
    typed: () => Promise.resolve(undefined),
    ...over,
  }
}

const KEYBOARDLESS = typing({
  typed: () => Promise.reject(new OperationalError("the keyboard never came up")),
})

const UNFOUND = typing({
  found: () => Promise.reject(new OperationalError(`nothing on the page matches ${SELECTOR}`)),
})

test("the element tapped is named as soon as that element is tapped", async () => {
  const done: string[] = []

  await typedIn(READ, done, typing())
  expect(done).toEqual([TAPPED, SENT])
})

test("a typing that threw after the tap names that tap in its refusal", async () => {
  const held = await answering(async (done) => await typedIn(READ, done, KEYBOARDLESS))

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([TAPPED, SENT])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(TAPPED)
  expect(last).toContain(SENT)
})

test("a typing that threw before the tap names nothing", async () => {
  const held = await answering(async (done) => await typedIn(READ, done, UNFOUND))

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a call naming no element taps nothing, and still names the text it sent", async () => {
  const held = await answering(async (done) => await typedIn(FOCUSED, done, KEYBOARDLESS))

  expect(held.report).toEqual([SENT_FOCUSED])
  expect(held.refusals.at(-1)).toContain(SENT_FOCUSED)
})

test("a call naming no text is refused before the session is reached", async () => {
  const said = await mobileSimType([], GIVEN)

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toBe(`\`${CALLED_AS}\` takes \`--text\`, and nothing said it`)
})

test("a call naming an element and no text is refused", async () => {
  const said = await mobileSimType(["--selector", SELECTOR], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--text")
})

test("a flag this takes no argument at is refused by name", async () => {
  const said = await mobileSimType(["--bogus"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--bogus")
  expect(said.refusals[0]).toContain("--text")
})

test("a bare word is refused, since this names every argument at a flag", async () => {
  const said = await mobileSimType(["hunter2"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("hunter2")
})

test("text said is the text typed, and nothing is piped in for it", () => {
  expect(textIn("hunter2", SELECTOR)).toEqual({ text: "hunter2", selector: SELECTOR })
})

test("a dash reads the text from what is piped in", () => {
  const said = textIn("-", undefined, () => PIPED_TEXT)

  expect(said).toEqual({ text: "hunter2", selector: undefined })
})

test("a dash with a terminal on the other end is refused", () => {
  const said = textIn("-", undefined, () => ({ tty: true }))

  expect(said).toEqual({
    refused: ["`--text -` reads the text from what is piped in, and nothing was"],
  })
})

test("a dash piped nothing at all is refused", () => {
  const said = textIn("-", undefined, () => PIPED_NOTHING)

  expect(said).toEqual({ refused: ["`--text -` was piped nothing to type"] })
})
