import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { SimSessionState } from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import {
  answering,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type {
  Read,
  Typing,
} from "akasha/commands/pages/mobile/sim/type/mobile-sim-type.command.code.ts"
import {
  mobileSimType,
  tappedSaid,
  typedIn,
} from "akasha/commands/pages/mobile/sim/type/mobile-sim-type.command.code.ts"

const SELECTOR = "#password"

const TAPPED = tappedSaid(SELECTOR)

const READ: Read = { text: "hunter2", selector: SELECTOR }

const FOCUSED: Read = { text: "hunter2", selector: undefined }

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
  expect(done).toEqual([TAPPED])
})

test("a typing that threw after the tap names that tap in its refusal", async () => {
  const held = await answering(async (done) => await typedIn(READ, done, KEYBOARDLESS))

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([TAPPED])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(TAPPED)
})

test("a typing that threw before the tap names nothing", async () => {
  const held = await answering(async (done) => await typedIn(READ, done, UNFOUND))

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a call naming no element taps nothing, so a throw there names nothing", async () => {
  const held = await answering(async (done) => await typedIn(FOCUSED, done, KEYBOARDLESS))

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a call naming no text is refused before the session is reached", async () => {
  const said = await mobileSimType([])

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--text")
})

test("a call naming an element and no text is refused", async () => {
  const said = await mobileSimType(["--selector", SELECTOR])

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--text")
})

test("a flag this takes no argument at is refused by name", async () => {
  const said = await mobileSimType(["--bogus"])

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--bogus")
  expect(said.refusals[0]).toContain("--text")
})

test("a bare word is refused, since this names every argument at a flag", async () => {
  const said = await mobileSimType(["hunter2"])

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("hunter2")
})

test("a dash naming what is piped in reaches no piping today", async () => {
  const said = await mobileSimType(["--text", "-"])

  expect(said.code).toBe(1)
  expect(said.refusals).toEqual([
    "`--text` names a value, and nothing that could be one followed it",
  ])
})
