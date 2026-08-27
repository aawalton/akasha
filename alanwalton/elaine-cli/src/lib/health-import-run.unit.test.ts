import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import type { HealthSample, HealthSampleWriteReport } from "@alanwalton/health-samples-access/types"
import { CONVERTIBLE_COUNT, IMPORT_STDOUT_LINES } from "./fixtures/import-stdout"
import { type ImportRunDeps, runHealthImport } from "./health-import-run"
import { releaseScratchTrees, scratchTree } from "./scratch-tree"

let cacheDir: string

beforeEach(() => {
  cacheDir = scratchTree("health-import-test-")
})

afterEach(releaseScratchTrees)

function fakeStore() {
  const rows = new Map<string, HealthSample>()
  const batchSizes: number[] = []
  let failAfterBatch: number | undefined

  const identity = (s: HealthSample): string =>
    [s.metric, s.sourceName, s.startedAt, s.endedAt].join("|")

  const writeBatch = async (samples: readonly HealthSample[]): Promise<HealthSampleWriteReport> => {
    if (failAfterBatch !== undefined && batchSizes.length >= failAfterBatch) {
      throw new Error("interrupted")
    }
    batchSizes.push(samples.length)
    let inserted = 0
    let unchanged = 0
    let valueChanged = 0
    const distinct = new Map<string, HealthSample>()
    for (const s of samples) distinct.set(identity(s), s)
    for (const [key, s] of distinct) {
      const prior = rows.get(key)
      if (prior === undefined) inserted += 1
      else if (prior.value === s.value) unchanged += 1
      else valueChanged += 1
      rows.set(key, s)
    }
    return { received: samples.length, distinct: distinct.size, inserted, unchanged, valueChanged }
  }

  return {
    rows,
    batchSizes,
    writeBatch,
    interruptAfter(n: number) {
      failAfterBatch = n
    },
    resume() {
      failAfterBatch = undefined
    },
  }
}

function deps(store: ReturnType<typeof fakeStore>): ImportRunDeps {
  return {
    openStream: async function* () {
      for (const line of IMPORT_STDOUT_LINES) yield line
    },
    writeBatch: store.writeBatch,
  }
}

const OPTS = {
  sinceDay: "0001-01-01",
  batchSize: 4,
  dryRun: false,
  restart: false,
  onProgress: () => {},
}

describe("runHealthImport", () => {
  test("every convertible record in the stream reaches the writer, one row each", async () => {
    const store = fakeStore()
    const outcome = await runHealthImport({ ...OPTS, cacheDir }, deps(store))
    expect(outcome.samplesWritten).toBe(CONVERTIBLE_COUNT)
    expect(store.rows.size).toBe(CONVERTIBLE_COUNT)
    expect(outcome.write.inserted).toBe(CONVERTIBLE_COUNT)
  })

  test("the source path and export date are read off the stream header", async () => {
    const store = fakeStore()
    const outcome = await runHealthImport({ ...OPTS, cacheDir }, deps(store))
    expect(outcome.sourceFile).toBe("/Users/walton/Downloads/export.zip")
    expect(outcome.exportedAtMs).toBe(Date.parse("2024-01-16T08:30:00-08:00"))
  })

  test("writes go up in batches no larger than asked", async () => {
    const store = fakeStore()
    await runHealthImport({ ...OPTS, batchSize: 4, cacheDir }, deps(store))
    expect(store.batchSizes.length).toBeGreaterThan(1)
    for (const size of store.batchSizes) expect(size).toBeLessThanOrEqual(4)
    expect(store.batchSizes.reduce((a, b) => a + b, 0)).toBe(CONVERTIBLE_COUNT)
  })

  test("the batch size does not change what is stored", async () => {
    const one = fakeStore()
    const many = fakeStore()
    await runHealthImport({ ...OPTS, batchSize: 100, cacheDir }, deps(one))
    await runHealthImport({ ...OPTS, batchSize: 1, cacheDir }, deps(many))
    expect([...many.rows.keys()].sort()).toEqual([...one.rows.keys()].sort())
  })

  test("re-running against the same export adds nothing", async () => {
    const store = fakeStore()
    await runHealthImport({ ...OPTS, cacheDir }, deps(store))
    const second = await runHealthImport({ ...OPTS, cacheDir }, deps(store))
    expect(store.rows.size).toBe(CONVERTIBLE_COUNT)
    expect(second.write.inserted).toBe(0)
    expect(second.write.unchanged).toBe(CONVERTIBLE_COUNT)
  })

  test("a run against a LATER export adds only the records that are new", async () => {
    const store = fakeStore()
    await runHealthImport({ ...OPTS, cacheDir }, deps(store))

    const laterLine =
      '<Record type="HKQuantityTypeIdentifierActiveEnergyBurned" sourceName="Alan’s Apple Watch" unit="Cal" startDate="2024-02-01 09:00:00 -0800" endDate="2024-02-01 09:05:00 -0800" value="7.7"/>'
    const laterExport: ImportRunDeps = {
      openStream: async function* () {
        for (const line of IMPORT_STDOUT_LINES) yield line
        yield laterLine
      },
      writeBatch: store.writeBatch,
    }
    const second = await runHealthImport({ ...OPTS, cacheDir }, laterExport)
    expect(second.write.inserted).toBe(1)
    expect(second.write.unchanged).toBe(CONVERTIBLE_COUNT)
    expect(store.rows.size).toBe(CONVERTIBLE_COUNT + 1)
  })

  test("an interrupted run resumes rather than rewriting what it already wrote", async () => {
    const store = fakeStore()
    store.interruptAfter(1)
    await expect(runHealthImport({ ...OPTS, cacheDir }, deps(store))).rejects.toThrow("interrupted")
    const afterCrash = store.rows.size
    expect(afterCrash).toBe(4)

    store.resume()
    const resumed = await runHealthImport({ ...OPTS, cacheDir }, deps(store))
    expect(resumed.resumedFrom).toBeGreaterThan(0)
    expect(resumed.samplesWritten).toBe(CONVERTIBLE_COUNT - afterCrash)
    expect(store.rows.size).toBe(CONVERTIBLE_COUNT)
  })

  test("--restart ignores a checkpoint and re-reads from the start", async () => {
    const store = fakeStore()
    store.interruptAfter(1)
    await expect(runHealthImport({ ...OPTS, cacheDir }, deps(store))).rejects.toThrow("interrupted")

    store.resume()
    const restarted = await runHealthImport({ ...OPTS, restart: true, cacheDir }, deps(store))
    expect(restarted.resumedFrom).toBe(0)
    expect(restarted.samplesWritten).toBe(CONVERTIBLE_COUNT)
    expect(store.rows.size).toBe(CONVERTIBLE_COUNT)
  })

  test("a completed run leaves no checkpoint behind", async () => {
    const store = fakeStore()
    await runHealthImport({ ...OPTS, cacheDir }, deps(store))
    const next = await runHealthImport({ ...OPTS, cacheDir }, deps(store))
    expect(next.resumedFrom).toBe(0)
  })

  test("a dry run counts the export and writes nothing", async () => {
    const store = fakeStore()
    const outcome = await runHealthImport({ ...OPTS, dryRun: true, cacheDir }, deps(store))
    expect(store.rows.size).toBe(0)
    expect(store.batchSizes).toHaveLength(0)
    expect(outcome.tally.converted).toBe(CONVERTIBLE_COUNT)
  })

  test("per-metric counts and the earliest instant come off the records themselves", async () => {
    const store = fakeStore()
    const outcome = await runHealthImport({ ...OPTS, dryRun: true, cacheDir }, deps(store))
    expect(outcome.perMetric.activeEnergy.count).toBe(6)
    expect(outcome.perMetric.stepCount.count).toBe(3)
    expect(outcome.perMetric.activeEnergy.earliestMs).toBe(Date.parse("2024-01-13T09:00:00-08:00"))
    expect(outcome.perMetric.stepCount.earliestMs).toBe(Date.parse("2024-01-13T09:00:00-08:00"))
  })

  test("a stream with no export yields a null source and no writes", async () => {
    const store = fakeStore()
    const outcome = await runHealthImport(
      { ...OPTS, cacheDir },
      {
        openStream: async function* () {
          yield "NOFILE"
        },
        writeBatch: store.writeBatch,
      }
    )
    expect(outcome.sourceFile).toBeNull()
    expect(store.rows.size).toBe(0)
  })
})
