import { expect, test } from "bun:test"
import { shellNameOf } from "./shell-naming.module.code.ts"

test("a running process answers with the name it runs under", () => {
  const name = shellNameOf(process.pid)
  expect(name.length).toBeGreaterThan(0)
})

test("a name carries no line ending", () => {
  const name = shellNameOf(process.pid)
  expect(name).toBe(name.trim())
  expect(name.includes("\n")).toBe(false)
})

// The process that started every other is always there, so this asks for a pid that is certainly
// running without asking what this test itself happens to be.
test("the first process is read as well as any other", () => {
  expect(shellNameOf(1).length).toBeGreaterThan(0)
})

test("a pid nothing is running answers with no name", () => {
  // Above the pid ceiling every Linux carries, so nothing can be running under it.
  expect(shellNameOf(4_294_967_295)).toBe("")
})

test("a pid that is no pid answers with no name", () => {
  expect(shellNameOf(0)).toBe("")
  expect(shellNameOf(-1)).toBe("")
  expect(shellNameOf(1.5)).toBe("")
  expect(shellNameOf(Number.NaN)).toBe("")
})
