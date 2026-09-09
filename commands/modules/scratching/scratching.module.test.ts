import { afterAll, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { dirname } from "node:path"
import { keptAt, SCRATCH_AT, scratchWorld } from "./scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PREFIX = "akasha-scratching-"

test("the place a scratch world sits in is named here, and it is /var/tmp", () => {
  expect(SCRATCH_AT).toBe("/var/tmp")
})

test("a root sits under /var/tmp, carrying the prefix it was asked for", () => {
  const root = scratch.rootFor(PREFIX)
  expect(dirname(root)).toBe("/var/tmp")
  expect(root).toStartWith(`/var/tmp/${PREFIX}`)
  expect(existsSync(root)).toBe(true)
})

test("two roots asked for under one prefix are two places", () => {
  expect(scratch.rootFor(PREFIX)).not.toBe(scratch.rootFor(PREFIX))
})

test("a sweep takes every root the world handed out", () => {
  const held = scratchWorld()
  const one = held.rootFor(PREFIX)
  const two = held.rootFor(PREFIX)
  held.sweep()
  expect([existsSync(one), existsSync(two)]).toEqual([false, false])
})

test("a kept root is left as it was by the sweep of any world a test file holds", () => {
  const held = scratchWorld()
  held.rootFor(PREFIX)
  const root = keptAt(PREFIX)
  held.sweep()
  expect(existsSync(root)).toBe(true)
})

test("the kept world is swept by one handler the end of the process runs", () => {
  const root = keptAt(PREFIX)
  const swept = process.listeners("exit").filter((one) => one.name === "sweep")
  expect(swept.length).toBe(1)
  swept[0]?.(0)
  expect(existsSync(root)).toBe(false)
})

test("a sweep asked twice is no trouble the second time", () => {
  const held = scratchWorld()
  held.rootFor(PREFIX)
  held.sweep()
  expect(() => held.sweep()).not.toThrow()
})
