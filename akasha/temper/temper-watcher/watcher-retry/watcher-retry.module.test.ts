import { expect, test } from "bun:test"
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  backoffFor,
  isBusyError,
  MAX_RETRIES,
  retryOnBusy,
  writeFileAtomicWithRetry,
} from "./watcher-retry.module.code.ts"

const SCRATCH_AT = "/var/tmp"

function busy(code: string): unknown {
  return Object.assign(new Error(code), { code })
}

function recorder(): { waits: number[]; said: string[]; deps: Parameters<typeof retryOnBusy>[2] } {
  const waits: number[] = []
  const said: string[] = []
  return { waits, said, deps: { sleepSync: (ms) => waits.push(ms), onRetry: (m) => said.push(m) } }
}

test("a file the system reports as busy is tried again", () => {
  expect(isBusyError(busy("EBUSY"))).toBe(true)
  expect(isBusyError(busy("EAGAIN"))).toBe(true)
})

test("a file that is simply absent is not tried again", () => {
  expect(isBusyError(busy("ENOENT"))).toBe(false)
})

test("what was thrown but carries no code is not tried again", () => {
  expect(isBusyError(new Error("EBUSY"))).toBe(false)
  expect(isBusyError("EBUSY")).toBe(false)
  expect(isBusyError(null)).toBe(false)
})

test("each attempt waits longer than the attempt before", () => {
  const waits = Array.from({ length: MAX_RETRIES - 1 }, (_, i) => backoffFor(i + 1))
  for (let i = 1; i < waits.length; i++) expect(waits[i]).toBeGreaterThan(waits[i - 1] ?? 0)
})

test("an attempt past the delays named waits the longest named delay", () => {
  expect(backoffFor(99)).toBe(3200)
})

test("a read that works first time waits not at all", () => {
  const r = recorder()
  expect(retryOnBusy(() => "content", "read", r.deps)).toBe("content")
  expect(r.waits).toEqual([])
})

test("a busy file answered on a later attempt is answered", () => {
  const r = recorder()
  let attempts = 0
  const value = retryOnBusy(
    () => {
      attempts++
      if (attempts < 3) throw busy("EBUSY")
      return "content"
    },
    "read",
    r.deps
  )
  expect(value).toBe("content")
  expect(attempts).toBe(3)
  expect(r.waits).toEqual([200, 400])
  expect(r.said).toHaveLength(2)
})

test("anything else thrown reaches the caller on the first attempt", () => {
  const r = recorder()
  let attempts = 0
  expect(() =>
    retryOnBusy(
      () => {
        attempts++
        throw busy("ENOENT")
      },
      "read",
      r.deps
    )
  ).toThrow("ENOENT")
  expect(attempts).toBe(1)
  expect(r.waits).toEqual([])
})

test("the final attempt throws rather than waiting again", () => {
  const r = recorder()
  let attempts = 0
  expect(() =>
    retryOnBusy(
      () => {
        attempts++
        throw busy("EBUSY")
      },
      "read",
      r.deps
    )
  ).toThrow("EBUSY")
  expect(attempts).toBe(MAX_RETRIES)
  expect(r.waits).toHaveLength(MAX_RETRIES - 1)
})

function scratch(): string {
  return mkdtempSync(join(SCRATCH_AT, "akasha-watcher-retry-"))
}

test("a write reaches the path asked for holding what was handed in", () => {
  const dir = scratch()
  try {
    const path = join(dir, "fresh.lua")
    writeFileAtomicWithRetry(path, "Vars = {\n}")
    expect(readFileSync(path, "utf-8")).toBe("Vars = {\n}")
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test("a write over a path already holding something replaces what it held", () => {
  const dir = scratch()
  try {
    const path = join(dir, "existing.lua")
    writeFileSync(path, "old content")
    writeFileAtomicWithRetry(path, "new content")
    expect(readFileSync(path, "utf-8")).toBe("new content")
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test("the path written beside is gone once the write has landed", () => {
  const dir = scratch()
  try {
    writeFileAtomicWithRetry(join(dir, "clean.lua"), "Vars = {\n}")
    expect(readdirSync(dir).filter((name) => name.includes(".tmp"))).toEqual([])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
