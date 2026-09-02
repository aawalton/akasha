import { expect, test } from "bun:test"
import { isSourceRuntime } from "./watcher-runtime.module.code.ts"

test("the word source means the worker runs from source", () => {
  expect(isSourceRuntime({ WATCHER_RUNTIME: "source" })).toBe(true)
})

test("an unset variable means the worker runs from a compiled executable", () => {
  expect(isSourceRuntime({})).toBe(false)
})

test("an empty variable means the worker runs from a compiled executable", () => {
  expect(isSourceRuntime({ WATCHER_RUNTIME: "" })).toBe(false)
})

test("only the exact word source counts", () => {
  expect(isSourceRuntime({ WATCHER_RUNTIME: "Source" })).toBe(false)
  expect(isSourceRuntime({ WATCHER_RUNTIME: "sources" })).toBe(false)
  expect(isSourceRuntime({ WATCHER_RUNTIME: "compiled" })).toBe(false)
})
