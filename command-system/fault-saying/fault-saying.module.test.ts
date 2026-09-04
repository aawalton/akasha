import { expect, test } from "bun:test"
import { framesOf, oneLine, saidBy, whyOf } from "./fault-saying.module.code.ts"

test("an Error says its message and nothing about its kind", () => {
  expect(saidBy(new Error("it would not load"))).toBe("it would not load")
  expect(saidBy(new TypeError("held is not a function"))).toBe("held is not a function")
})

test("a thrown thing that is no Error is still made to speak", () => {
  expect(saidBy("held")).toBe("held")
  expect(saidBy(404)).toBe("404")
  expect(saidBy(null)).toBe("null")
  expect(saidBy(undefined)).toBe("undefined")
})

test("an Error carrying no message says nothing rather than its name", () => {
  expect(saidBy(new Error(""))).toBe("")
})

test("what is said in one line is the whole of it with its breaks closed up", () => {
  expect(whyOf(new Error("  Expected identifier\n  but found end of file  "))).toBe(
    "Expected identifier but found end of file"
  )
})

test("a fault too long to carry is cut, and says it was cut", () => {
  const said = whyOf(new Error("held ".repeat(200)))
  expect(said).toEndWith("...")
  expect(said.length).toBe(240)
})

test("what was never thrown is said in one line too, so a reason a commit carries is shaped here", () => {
  expect(oneLine("  a b\n  c  ")).toBe("a b c")
  expect(oneLine("held ".repeat(200)).length).toBe(240)
})

function threwHere(): unknown {
  try {
    throw new Error("the world would not be made")
  } catch (thrown) {
    return thrown
  }
}

const PATHLESS =
  "Error: ENOENT: no such file or directory, open\n" +
  "    at cpSync (unknown)\n" +
  "    at /repo/akasha/code-system/code-tests/code-tests.module.code.ts:207:11\n" +
  "    at worldOf (/repo/akasha/code-system/code-tests/code-tests.module.code.ts:244:7)\n" +
  "    at /repo/akasha/checks/one.code-check.code.ts:31:3\n"

function pathless(): Error {
  const held = new Error("ENOENT: no such file or directory, open")
  held.stack = PATHLESS
  return held
}

test("where a fault was thrown is read off the stack it carries, as file, line and column", () => {
  const frames = framesOf(threwHere(), 1)
  expect(frames.length).toBe(1)
  expect(frames[0]).toMatch(/\/fault-saying\.module\.test\.ts:\d+:\d+$/)
})

test("a frame the runtime names no file for is passed over, so a native throw still names a caller", () => {
  expect(framesOf(pathless(), 1)).toEqual([
    "/repo/akasha/code-system/code-tests/code-tests.module.code.ts:207:11",
  ])
})

test("a frame is read whether the runtime names the function it belongs to or not", () => {
  expect(framesOf(pathless(), 3)).toEqual([
    "/repo/akasha/code-system/code-tests/code-tests.module.code.ts:207:11",
    "/repo/akasha/code-system/code-tests/code-tests.module.code.ts:244:7",
    "/repo/akasha/checks/one.code-check.code.ts:31:3",
  ])
})

test("how many frames come back is what the caller asked for and no more", () => {
  expect(framesOf(pathless(), 0)).toEqual([])
  expect(framesOf(pathless(), 2).length).toBe(2)
  expect(framesOf(pathless(), 9).length).toBe(3)
})

test("a thrown thing that is no Error was thrown from nowhere, so it carries no frame", () => {
  expect(framesOf("held", 3)).toEqual([])
  expect(framesOf(null, 3)).toEqual([])
  expect(framesOf({ stack: "    at /repo/akasha/one.ts:1:1" }, 3)).toEqual([])
})

test("what a fault said carries no frame, so a caller wanting the sentence alone still gets it", () => {
  expect(saidBy(threwHere())).toBe("the world would not be made")
  expect(whyOf(pathless())).toBe("ENOENT: no such file or directory, open")
})
