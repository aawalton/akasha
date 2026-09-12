import { expect, test } from "bun:test"
import { mkdtemp, rm } from "node:fs/promises"
import { join } from "node:path"
import type { HealthSampleWriteReport } from "akasha/alan/harness/health-samples-access/sample-shape/sample-shape.module.code.ts"
import {
  type ImportRunDeps,
  type ImportRunOptions,
  NO_LOWER_BOUND,
  runHealthImport,
} from "akasha/alan/harness/health-samples-import/health-import-run/health-import-run.module.code.ts"
import { SCRATCH_AT } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const SOURCE = "/Users/nobody/Downloads/export.zip"

const BROKE = "the sample store answered 500"

const WROTE: HealthSampleWriteReport = {
  received: 1,
  distinct: 1,
  inserted: 1,
  unchanged: 0,
  valueChanged: 0,
}

function recordLine(at: number): string {
  const minute = String(at).padStart(2, "0")
  return (
    `<Record type="HKQuantityTypeIdentifierStepCount" sourceName="Phone" unit="count" ` +
    `value="${at}" startDate="2026-08-01 10:${minute}:00 +0000" ` +
    `endDate="2026-08-01 10:${minute}:30 +0000"/>`
  )
}

function reaching(many: number, stopsAt: number | null): ImportRunDeps {
  let batches = 0
  return {
    openStream: async function* () {
      yield `FILE\t${SOURCE}`
      for (let at = 0; at < many; at += 1) yield recordLine(at)
    },
    writeBatch: async () => {
      batches += 1
      if (batches === stopsAt) throw new Error(BROKE)
      return WROTE
    },
  }
}

function options(cacheDir: string): ImportRunOptions {
  return {
    sinceDay: NO_LOWER_BOUND,
    batchSize: 2,
    dryRun: false,
    restart: true,
    onProgress: () => undefined,
    cacheDir,
  }
}

async function inScratch(run: (cacheDir: string) => Promise<void>): Promise<void> {
  const dir = await mkdtemp(join(SCRATCH_AT, "health-import-run-"))
  try {
    await run(dir)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}

test("a run that wrote two batches and then broke names both of them", async () => {
  await inScratch(async (cacheDir) => {
    const done: string[] = []
    await expect(runHealthImport(options(cacheDir), reaching(6, 3), done)).rejects.toThrow(BROKE)
    expect(done).toEqual([
      "wrote batch 1, 2 samples, through record line 2",
      "wrote batch 2, 2 samples, through record line 4",
    ])
  })
})

test("a run that broke on the first batch names nothing, because nothing landed", async () => {
  await inScratch(async (cacheDir) => {
    const done: string[] = []
    await expect(runHealthImport(options(cacheDir), reaching(6, 1), done)).rejects.toThrow(BROKE)
    expect(done).toEqual([])
  })
})

test("a run that ended names every batch it wrote, the last one short", async () => {
  await inScratch(async (cacheDir) => {
    const done: string[] = []
    const outcome = await runHealthImport(options(cacheDir), reaching(5, null), done)
    expect(outcome.samplesWritten).toBe(5)
    expect(done).toEqual([
      "wrote batch 1, 2 samples, through record line 2",
      "wrote batch 2, 2 samples, through record line 4",
      "wrote batch 3, 1 samples, through record line 5",
    ])
  })
})

test("a dry run reaches no writer and so names nothing written", async () => {
  await inScratch(async (cacheDir) => {
    const done: string[] = []
    const outcome = await runHealthImport(
      { ...options(cacheDir), dryRun: true },
      reaching(6, 1),
      done
    )
    expect(outcome.batches).toBe(3)
    expect(done).toEqual([])
  })
})
