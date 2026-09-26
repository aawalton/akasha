import { expect, test } from "bun:test"
import {
  earliestRunsIn,
  writtenOf,
} from "akasha/change/agent/file-content/add-image-making-from-runs/add-image-making-from-runs.change-agent.code.ts"

const MADE = "318e0d8a455a7af961d71d0709ff439ea4bd446bdecde9e71e9c0623185982c6"

const SLUG = "image-318e0d8a455a7af9"

function row(startedAt: string, extra: Readonly<Record<string, unknown>> = {}): string {
  return JSON.stringify({
    id: startedAt,
    service: "image-gen",
    operation: "generate",
    model: "Tongyi-MAI/Z-Image-Turbo",
    host: "macbook",
    "command-line": "akasha inference generate",
    status: "completed",
    "started-at": startedAt,
    "service-versions": { mlx: "0.31.0", quantize: 8 },
    prompt: startedAt,
    seed: 7,
    "output-image-sha256": MADE,
    ...extra,
  })
}

test("the run that started first is the one an image was made by", () => {
  const later = row("2026-06-19T19:26:52.705Z")
  const first = row("2026-06-19T19:16:01.530Z")
  const made = earliestRunsIn([`${later}\n`, `${first}\n`]).get(SLUG)
  expect(made !== undefined && "making" in made ? made.making.prompt : null).toBe(
    "2026-06-19T19:16:01.530Z"
  )
})

test("a run that failed or made no image is passed over", () => {
  const failed = row("2026-06-01T00:00:00.000Z", { status: "failed" })
  const voiced = row("2026-06-02T00:00:00.000Z", { operation: "voice-clone" })
  expect(earliestRunsIn([`${failed}\n${voiced}\n`]).size).toBe(0)
})

test("a run's keys are read in camel case, and the host is dropped", () => {
  const made = earliestRunsIn([row("2026-06-03T00:00:00.000Z")]).get(SLUG)
  expect(made).toEqual({
    making: {
      service: "image-gen",
      operation: "generate",
      model: "Tongyi-MAI/Z-Image-Turbo",
      prompt: "2026-06-03T00:00:00.000Z",
      seed: 7,
      serviceVersions: { mlx: "0.31.0", quantize: 8 },
    },
  })
})

test("a run whose making cannot be read is named rather than passed over", () => {
  const made = earliestRunsIn([row("2026-06-04T00:00:00.000Z", { seed: "seven" })]).get(SLUG)
  expect(made !== undefined && "refused" in made).toBe(true)
})

test("each value is put under its key as the body spells it, newlines and all", () => {
  expect(writtenOf({ prompt: "one\ntwo", seed: 7, serviceVersions: ["mlx 0.31.0"] })).toEqual([
    { written: "put", key: "prompt", value: '"one\\ntwo"' },
    { written: "put", key: "seed", value: "7" },
    { written: "put", key: "serviceVersions", value: '["mlx 0.31.0"]' },
  ])
})
