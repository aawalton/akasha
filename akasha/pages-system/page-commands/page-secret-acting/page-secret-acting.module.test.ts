import { expect, test } from "bun:test"
import {
  FILE_PATH,
  KEY,
  MESSAGE,
  readIn,
  undeclared,
  valueOf,
} from "./page-secret-acting.module.code.ts"

const AT = "akasha/agents/claude-accounts/pages/one.claude-account.ts"

const HOLDING = { path: AT, sidecar: "one.claude-account.sops.yaml", declared: ["accessToken"] }

test("a call naming nothing is refused, naming what it takes", () => {
  const read = readIn([], [FILE_PATH])
  expect("refused" in read).toBe(true)
  expect(JSON.stringify(read)).toContain(FILE_PATH)
})

test("a flag it does not take is refused", () => {
  const read = readIn([FILE_PATH, AT, "--wat"], [FILE_PATH])
  expect(JSON.stringify(read)).toContain("--wat")
})

test("a flag standing where a value goes is refused rather than read as the value", () => {
  const read = readIn([FILE_PATH, KEY], [FILE_PATH, KEY])
  expect("refused" in read).toBe(true)
})

test("a flag said twice is refused", () => {
  const read = readIn([FILE_PATH, AT, FILE_PATH, AT], [FILE_PATH])
  expect("refused" in read).toBe(true)
})

test("a word said as no flag is refused", () => {
  const read = readIn(["show", FILE_PATH, AT], [FILE_PATH])
  expect("refused" in read).toBe(true)
})

test("a message is what this does not require", () => {
  expect(readIn([FILE_PATH, AT], [FILE_PATH, MESSAGE])).toEqual({
    path: AT,
    key: null,
    message: null,
  })
})

test("what is read carries the path, the key and the message apart", () => {
  expect(
    readIn([FILE_PATH, AT, KEY, "accessToken", MESSAGE, "m"], [FILE_PATH, KEY, MESSAGE])
  ).toEqual({ path: AT, key: "accessToken", message: "m" })
})

test("a key the page type does not declare is named against the ones it does", () => {
  const wrong = undeclared("wat", HOLDING)
  expect(wrong).toContain("wat")
  expect(wrong).toContain("accessToken")
})

test("a key the page type declares secret passes", () => {
  expect(undeclared("accessToken", HOLDING)).toBeNull()
})

test("a page type declaring no secret says so rather than naming nothing", () => {
  expect(undeclared("wat", { ...HOLDING, declared: [] })).toContain("declares none")
})

test("one trailing newline is dropped from a value piped in", () => {
  expect(valueOf(new TextEncoder().encode("held\n"))).toBe("held")
})

test("a value carrying no trailing newline is taken whole", () => {
  expect(valueOf(new TextEncoder().encode("held"))).toBe("held")
})

test("a value holding a newline of its own is refused", () => {
  expect(valueOf(new TextEncoder().encode("one\ntwo\n"))).toEqual({
    refused: "what was piped in holds a newline, and a secret's value is one line",
  })
})

test("a value that arrives empty is refused rather than standing for a usable one", () => {
  expect(typeof valueOf(new TextEncoder().encode("\n"))).toBe("object")
})

test("what is piped in that is no utf-8 text is refused", () => {
  expect(typeof valueOf(new Uint8Array([0xff, 0xfe, 0xfd]))).toBe("object")
})
