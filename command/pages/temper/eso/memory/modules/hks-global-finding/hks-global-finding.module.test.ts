import { expect, test } from "bun:test"
import type { Region } from "akasha/command/pages/temper/eso/memory/modules/eso-process-memory/eso-process-memory.module.code.ts"
import {
  globalsFoundUntilStopped,
  searchAfresh,
} from "akasha/command/pages/temper/eso/memory/modules/hks-global-finding/hks-global-finding.module.code.ts"
import type { Reader } from "akasha/command/pages/temper/eso/memory/modules/hks-table-reading/hks-table-reading.module.code.ts"

const NAME = "TemperCharacters_SavedVariables"

const REGIONS = 2_000

const PAGE = 0x1000n

const APART = 0x10000n

const CHUNK_MS = 5

const STOP_AFTER_MS = 100

const regions: readonly Region[] = Array.from({ length: REGIONS }, (_, index) => {
  const from = BigInt(index + 1) * APART
  return { from, to: from + PAGE, writable: true }
})

const slow: Reader = (_at, length) => {
  Bun.sleepSync(CHUNK_MS)
  return Buffer.alloc(length)
}

const fast: Reader = (_at, length) => Buffer.alloc(length)

test("a stop asked mid-search ends the search long before every region is read", async () => {
  const stopping = new AbortController()
  setTimeout(() => stopping.abort(), STOP_AFTER_MS)
  const search = searchAfresh()
  const started = Date.now()
  const found = await globalsFoundUntilStopped(
    slow,
    regions,
    [NAME],
    [search],
    new Set(),
    stopping.signal
  )
  expect(found).toBeNull()
  expect(Date.now() - started).toBeLessThan(1_000)
  expect(search.scan.chunks).toBeLessThan(REGIONS / 10)
})

test("a search nothing stops reads every region and says what it found", async () => {
  const search = searchAfresh()
  const found = await globalsFoundUntilStopped(
    fast,
    regions,
    [NAME],
    [search],
    new Set(),
    new AbortController().signal
  )
  expect(found).toEqual([null])
  expect(search.scan.chunks).toBe(REGIONS)
})
