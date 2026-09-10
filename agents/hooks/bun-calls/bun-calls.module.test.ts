import { expect, test } from "bun:test"
import { bunCallIn, bunCallsIn, scriptOf } from "./bun-calls.module.code.ts"

test("a bun call is read as its act and what follows it", () => {
  expect(bunCallIn("bun test akasha/")).toEqual({ act: "test", rest: ["akasha/"] })
})

test("a call carrying no act is no call here", () => {
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
  expect(bunCallIn("/usr/local/bin/bun test")?.act).toBe("test")
  expect(bunCallIn("./node_modules/.bin/bun test")?.act).toBe("test")
})

test("a prefix that sets the call up is stepped over", () => {
  expect(bunCallIn("sudo bun test")?.act).toBe("test")
  expect(bunCallIn("env bun test")?.act).toBe("test")
  expect(bunCallIn("AKASHA_ROOT=/one bun test")?.act).toBe("test")
})

test("a prefix that only runs the call is stepped over with its flags and numbers", () => {
  expect(bunCallIn("timeout 900 bun test")?.act).toBe("test")
  expect(bunCallIn("timeout -k 5 900 bun test")?.act).toBe("test")
  expect(bunCallIn("nice -n 10 bun test")?.act).toBe("test")
  expect(bunCallIn("nohup bun test")?.act).toBe("test")
  expect(bunCallIn("stdbuf -oL bun test")?.act).toBe("test")
  expect(bunCallIn("time bun test")?.act).toBe("test")
  expect(bunCallIn("command bun test")?.act).toBe("test")
})

test("a flag before the act is stepped over, and one taking a value takes the word after it", () => {
  expect(bunCallIn("bun --silent test akasha/")).toEqual({ act: "test", rest: ["akasha/"] })
  expect(bunCallIn("bun --cwd /elsewhere test")).toEqual({ act: "test", rest: [] })
  expect(bunCallIn("bun --preload ./one.ts test")).toEqual({ act: "test", rest: [] })
})

test("what follows the act is returned unread", () => {
  expect(bunCallIn("bun test --timeout 5000 akasha/")?.rest).toEqual([
    "--timeout",
    "5000",
    "akasha/",
  ])
})

test("the script a run names is read past the flags before it", () => {
  expect(scriptOf({ act: "run", rest: ["typecheck"] })).toBe("typecheck")
  expect(scriptOf({ act: "run", rest: ["--silent", "typecheck"] })).toBe("typecheck")
  expect(scriptOf({ act: "run", rest: ["--cwd", "/elsewhere", "typecheck"] })).toBe("typecheck")
})

test("a run naming no script has none, and no other act names one", () => {
  expect(scriptOf({ act: "run", rest: [] })).toBeNull()
  expect(scriptOf({ act: "run", rest: ["--silent"] })).toBeNull()
  expect(scriptOf({ act: "test", rest: ["typecheck"] })).toBeNull()
})

test("every call on one line is found", () => {
  const said = bunCallsIn("bun test one && bun run build || bun test two")
  expect(said.map((one) => one.act)).toEqual(["test", "run", "test"])
})

test("a call is found across lines and across a continuation", () => {
  expect(bunCallsIn("cd /one\nbun test akasha/").length).toBe(1)
  expect(bunCallsIn("bun \\\n  test akasha/")[0]?.act).toBe("test")
})

test("an act inside a quoted run is not read as a call", () => {
  expect(bunCallsIn('echo "bun test"')).toEqual([])
  expect(bunCallsIn("echo 'bun test'")).toEqual([])
})

test("a line carrying no bun call is read as none", () => {
  expect(bunCallsIn("git status && ls")).toEqual([])
})
