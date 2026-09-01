import type { HealthMetric, HealthSampleRecord } from "../sample-shape/sample-shape.module.code.ts"

export const HEALTH_SAMPLE_PAGE_TYPE = "health-sample"

const NOTHING_ANSWERS = [
  `a \`${HEALTH_SAMPLE_PAGE_TYPE}\` is a row beside a day in the old page store rather than a page`,
  "akasha carries, and the pages system service answers for akasha alone.",
  "no reading is read back.",
].join(" ")

export async function selectHealthSamples(args: {
  readonly metric: HealthMetric
  readonly from: string
  readonly to: string
}): Promise<readonly HealthSampleRecord[]> {
  throw new Error(
    `selectHealthSamples: ${NOTHING_ANSWERS} ${args.metric} from ${args.from} to ${args.to} goes unread`
  )
}
