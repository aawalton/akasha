import { expect, test } from "bun:test"
import { FILE_TYPES } from "../watcher-file-type/watcher-file-type.module.code.ts"
import { initialFileState, initialWatcherState } from "./watcher-state.module.code.ts"

test("a file begins with nothing running and nothing having run", () => {
  const state = initialFileState()
  expect(state.running).toBe(false)
  expect(state.lastRunTime).toBe(0)
})

test("a hash never recorded is null rather than an empty string", () => {
  const state = initialFileState()
  expect(state.lastWriteBackContentHash).toBeNull()
  expect(state.lastInventoryConfigWriteBackHash).toBeNull()
  expect(state.lastCatalogConfigWriteBackHash).toBeNull()
  expect(state.lastCharactersConfigWriteBackHash).toBeNull()
  expect(state.lastCompanionsConfigWriteBackHash).toBeNull()
})

test("every kind of file the watcher knows is remembered from the start", () => {
  const state = initialWatcherState()
  expect(Object.keys(state).sort()).toEqual([...FILE_TYPES].sort())
})

test("every kind of file begins in the same state", () => {
  const state = initialWatcherState()
  for (const fileType of FILE_TYPES) expect(state[fileType]).toEqual(initialFileState())
})

test("each kind of file is remembered apart from every other kind", () => {
  const state = initialWatcherState()
  state.sales.running = true
  expect(state.catalog.running).toBe(false)
})

test("one watcher state does not share its memory with another", () => {
  const first = initialWatcherState()
  const second = initialWatcherState()
  first.errors.lastRunTime = 99
  expect(second.errors.lastRunTime).toBe(0)
})
