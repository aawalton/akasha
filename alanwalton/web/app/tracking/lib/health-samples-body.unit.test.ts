import { describe, expect, test } from "bun:test"
import { HealthSamplesIngestSchema, MAX_INGEST_SAMPLES } from "./health-samples-body"

const SAMPLE = {
  metric: "activeEnergy",
  startedAt: "2024-01-13T07:00:00-08:00",
  endedAt: "2024-01-13T07:01:00-08:00",
  value: 1.5,
  unit: "kcal",
  sourceName: "Alan's Apple Watch",
}

const bodyOf = (...samples: readonly unknown[]) => ({ samples })

describe("no age gate — the objective the historical import depends on", () => {
  test("accepts a sample years older than the neighbouring route's 30-day horizon", () => {
    const ancient = {
      ...SAMPLE,
      startedAt: "2019-03-04T11:00:00-07:00",
      endedAt: "2019-03-04T11:01:00-07:00",
    }
    expect(HealthSamplesIngestSchema.safeParse(bodyOf(ancient)).success).toBe(true)
  })

  test("accepts a sample from the far past, there being no lower bound at all", () => {
    const older = {
      ...SAMPLE,
      startedAt: "2008-06-01T00:00:00Z",
      endedAt: "2008-06-01T00:01:00Z",
    }
    expect(HealthSamplesIngestSchema.safeParse(bodyOf(older)).success).toBe(true)
  })
})

describe("one contract, two senders", () => {
  test("admits an offset-bearing instant and a Z instant alike", () => {
    const utc = { ...SAMPLE, startedAt: "2024-01-13T15:00:00Z", endedAt: "2024-01-13T15:01:00Z" }
    expect(HealthSamplesIngestSchema.safeParse(bodyOf(SAMPLE)).success).toBe(true)
    expect(HealthSamplesIngestSchema.safeParse(bodyOf(utc)).success).toBe(true)
  })

  test("refuses an instant carrying no offset, which would name no moment", () => {
    const naive = { ...SAMPLE, startedAt: "2024-01-13T07:00:00" }
    expect(HealthSamplesIngestSchema.safeParse(bodyOf(naive)).success).toBe(false)
  })
})

describe("the unit must match the metric", () => {
  test("refuses kilojoules posted as active energy", () => {
    expect(HealthSamplesIngestSchema.safeParse(bodyOf({ ...SAMPLE, unit: "kJ" })).success).toBe(
      false
    )
  })

  test("refuses a step count carrying an energy unit", () => {
    const wrong = { ...SAMPLE, metric: "stepCount", unit: "kcal" }
    expect(HealthSamplesIngestSchema.safeParse(bodyOf(wrong)).success).toBe(false)
  })

  test("admits each metric with its own canonical unit", () => {
    const steps = { ...SAMPLE, metric: "stepCount", unit: "count", value: 120 }
    expect(HealthSamplesIngestSchema.safeParse(bodyOf(SAMPLE)).success).toBe(true)
    expect(HealthSamplesIngestSchema.safeParse(bodyOf(steps)).success).toBe(true)
  })

  test("refuses a metric the store does not hold", () => {
    const unknown = { ...SAMPLE, metric: "heartRate" }
    expect(HealthSamplesIngestSchema.safeParse(bodyOf(unknown)).success).toBe(false)
  })
})

describe("sanity on instants and shape, which is all that is left", () => {
  test("refuses an interval that ends before it starts", () => {
    const backwards = {
      ...SAMPLE,
      startedAt: "2024-01-13T07:01:00-08:00",
      endedAt: "2024-01-13T07:00:00-08:00",
    }
    expect(HealthSamplesIngestSchema.safeParse(bodyOf(backwards)).success).toBe(false)
  })

  test("admits a zero-length interval, HealthKit emitting instantaneous samples", () => {
    const instant = { ...SAMPLE, endedAt: SAMPLE.startedAt }
    expect(HealthSamplesIngestSchema.safeParse(bodyOf(instant)).success).toBe(true)
  })

  test("refuses a negative value", () => {
    expect(HealthSamplesIngestSchema.safeParse(bodyOf({ ...SAMPLE, value: -1 })).success).toBe(
      false
    )
  })

  test("refuses an unexpected key rather than dropping it silently", () => {
    const extra = { ...SAMPLE, uuid: "something-the-phone-has-and-the-export-does-not" }
    expect(HealthSamplesIngestSchema.safeParse(bodyOf(extra)).success).toBe(false)
  })

  test("refuses an empty batch", () => {
    expect(HealthSamplesIngestSchema.safeParse(bodyOf()).success).toBe(false)
  })

  test("admits a batch at the cap and refuses one over it", () => {
    const at = Array.from({ length: MAX_INGEST_SAMPLES }, () => SAMPLE)
    expect(HealthSamplesIngestSchema.safeParse({ samples: at }).success).toBe(true)
    expect(HealthSamplesIngestSchema.safeParse({ samples: [...at, SAMPLE] }).success).toBe(false)
  })

  test("refuses a body-supplied owner", () => {
    const spoofed = { ...SAMPLE, userId: "somebody-else" }
    expect(HealthSamplesIngestSchema.safeParse(bodyOf(spoofed)).success).toBe(false)
  })
})
