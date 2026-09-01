import { expect, test } from "bun:test"
import { environValue, procEntries, statedIn } from "./proc-reading.module.code.ts"

test("an environment variable is read off the block by its own name", () => {
  const block = "PATH=/usr/bin\0AGENT_ID=abc\0HOME=/root\0"
  expect(environValue(block, "AGENT_ID")).toBe("abc")
  expect(environValue(block, "PATH")).toBe("/usr/bin")
})

test("a name that only prefixes another is not that other", () => {
  expect(environValue("AGENT_IDLE=no\0", "AGENT_ID")).toBeNull()
})

test("a variable carrying an equals sign keeps it", () => {
  expect(environValue("ARGS=a=b\0", "ARGS")).toBe("a=b")
})

test("a variable that is not there answers null", () => {
  expect(environValue("PATH=/usr/bin\0", "AGENT_ID")).toBeNull()
})

test("state and parent are read past the command name", () => {
  expect(statedIn("42 (bun) S 7 42 42 0 -1 4194304")).toEqual({ state: "S", ppid: 7 })
})

test("a command name holding spaces and brackets does not move the fields", () => {
  expect(statedIn("42 (my (odd) name) R 9 42 42")).toEqual({ state: "R", ppid: 9 })
})

test("a stat line with no closing bracket answers nothing rather than guessing", () => {
  expect(statedIn("42 bun S 7")).toEqual({ state: null, ppid: null })
})

test("this very process is among those carrying PATH", () => {
  const read = procEntries(["PATH"])
  expect(read.opened).toBe(true)
  const mine = read.entries.find((one) => one.pid === process.pid)
  expect(mine).toBeDefined()
  expect(mine?.named["PATH"]).toBe(process.env["PATH"] ?? "")
})

test("a name no process carries leaves the reading empty", () => {
  expect(procEntries(["AKASHA_NO_PROCESS_CARRIES_THIS"]).entries).toEqual([])
})
