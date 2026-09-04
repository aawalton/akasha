import { expect, test } from "bun:test"
import { healthSamplesIngestSchema, MAX_INGEST_SAMPLES } from "./health-samples-body.module.code.ts"

const STEPS = {
  metric: "stepCount",
  startedAt: "2026-08-31T10:00:00.000Z",
  endedAt: "2026-08-31T11:00:00.000Z",
  value: 900,
  unit: "count",
  sourceName: "a phone",
}

test("a body carrying one well-formed sample is taken", () => {
  expect(healthSamplesIngestSchema.safeParse({ samples: [STEPS] }).success).toBe(true)
})

test("a sample naming a metric this system does not keep is refused", () => {
  const other = { ...STEPS, metric: "heartRate" }
  expect(healthSamplesIngestSchema.safeParse({ samples: [other] }).success).toBe(false)
})

test("a sample stating a unit that is not its metric's own is refused", () => {
  const wrong = { ...STEPS, unit: "kcal" }
  expect(healthSamplesIngestSchema.safeParse({ samples: [wrong] }).success).toBe(false)
})

test("a sample that ends before it starts is refused", () => {
  const backwards = { ...STEPS, endedAt: "2026-08-31T09:00:00.000Z" }
  expect(healthSamplesIngestSchema.safeParse({ samples: [backwards] }).success).toBe(false)
})

test("a sample that starts and ends at the same instant is taken", () => {
  const still = { ...STEPS, endedAt: STEPS.startedAt }
  expect(healthSamplesIngestSchema.safeParse({ samples: [still] }).success).toBe(true)
})

test("a sample counting less than nothing is refused", () => {
  expect(healthSamplesIngestSchema.safeParse({ samples: [{ ...STEPS, value: -1 }] }).success).toBe(
    false
  )
})

test("a body carrying no sample is refused", () => {
  expect(healthSamplesIngestSchema.safeParse({ samples: [] }).success).toBe(false)
})

test("a body carrying more samples than one body may is refused", () => {
  const many = Array.from({ length: MAX_INGEST_SAMPLES + 1 }, () => STEPS)
  expect(healthSamplesIngestSchema.safeParse({ samples: many }).success).toBe(false)
})

test("a body carrying more than its samples is refused", () => {
  expect(healthSamplesIngestSchema.safeParse({ samples: [STEPS], userId: "me" }).success).toBe(
    false
  )
})
