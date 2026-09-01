import type {
  HealthSample,
  HealthSampleWriteReport,
} from "../sample-shape/sample-shape.module.code.ts"

export const HEALTH_SAMPLE_PAGE_TYPE = "health-sample"

const NOTHING_LANDS = [
  `a \`${HEALTH_SAMPLE_PAGE_TYPE}\` is a row beside a day in the old page store rather than a page`,
  "akasha carries, and the pages system service answers for akasha alone.",
  "no reading is written down.",
].join(" ")

export async function upsertHealthSamples(args: {
  readonly samples: readonly HealthSample[]
}): Promise<HealthSampleWriteReport> {
  throw new Error(`upsertHealthSamples: ${NOTHING_LANDS} ${args.samples.length} readings are lost`)
}
