import { expect, test } from "bun:test"
import { bunCallIn, bunCallsIn } from "./bun-calls.module.code.ts"

test("a bun call is read as its verb and what follows it", () => {
  expect(bunCallIn("bun test akasha/")).toEqual({ verb: "test", rest: ["akasha/"] })
})

test("a call carrying no verb is no call here", () => {
  for (const one of ["bun", "bun --version", "bun --cwd /elsewhere"]) {
    expect(bunCallIn(one)).toBeNull()
  }
})

test("a program that is not bun is no call here", () => {
  for (const one of ["bunx test", "node test", "rebun test", "bundle test"]) {
    expect(bunCallIn(one)).toBeNull()
  }
})

test("bun reached by a path is still bun", () => {
  expect(bunCallIn("/usr/local/bin/bun test")?.verb).toBe("test")
  expect(bunCallIn("./node_modules/.bin/bun test")?.verb).toBe("test")
})

test("a prefix that sets the call up is stepped over", () => {
  expect(bunCallIn("sudo bun test")?.verb).toBe("test")
  expect(bunCallIn("env bun test")?.verb).toBe("test")
  expect(bunCallIn("AKASHA_ROOT=/one bun test")?.verb).toBe("test")
})

test("a flag before the verb is stepped over, and one taking a value takes the word after it", () => {
  expect(bunCallIn("bun --silent test akasha/")).toEqual({ verb: "test", rest: ["akasha/"] })
  expect(bunCallIn("bun --cwd /elsewhere test")).toEqual({ verb: "test", rest: [] })
  expect(bunCallIn("bun --preload ./one.ts test")).toEqual({ verb: "test", rest: [] })
})

test("what follows the verb is returned unread", () => {
  expect(bunCallIn("bun test --timeout 5000 akasha/")?.rest).toEqual([
    "--timeout",
    "5000",
    "akasha/",
  ])
})

test("every call on one line is found", () => {
  const said = bunCallsIn("bun test one && bun run build || bun test two")
  expect(said.map((one) => one.verb)).toEqual(["test", "run", "test"])
})

test("a call is found across lines and across a continuation", () => {
  expect(bunCallsIn("cd /one\nbun test akasha/").length).toBe(1)
  expect(bunCallsIn("bun \\\n  test akasha/")[0]?.verb).toBe("test")
})

test("a verb inside a quoted run is not read as a call", () => {
  expect(bunCallsIn('echo "bun test"')).toEqual([])
  expect(bunCallsIn("echo 'bun test'")).toEqual([])
})

test("a line carrying no bun call is read as none", () => {
  expect(bunCallsIn("git status && ls")).toEqual([])
})
