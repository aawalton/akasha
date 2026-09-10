import {
  appliedWorkload,
  servableNamed,
} from "../../../../infrastructure/cluster/services/workload-applying/workload-applying.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../modules/calling/calling.module.code.ts"

const INPUT = 1
const DATA = 2
const DRY_RUN = "--dry-run"

export async function infrastructureWorkloadApply(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const strange = argv.find((one) => one.startsWith("-") && one !== DRY_RUN)
  if (strange !== undefined) {
    return refused(
      `\`${strange}\` is nothing \`akasha infrastructure workload-apply\` takes`,
      INPUT
    )
  }
  const named = argv.filter((one) => !one.startsWith("-"))
  if (named.length === 0) {
    return refused("name the cluster service to apply by the slug its page carries", INPUT)
  }
  if (named.length > 1) {
    return refused(
      `one call applies one cluster service, and ${named.length} were named, so which one is meant is unsettled: ${named.join(", ")}`,
      INPUT
    )
  }
  const slug = named[0] as string
  const read = servableNamed(given.root, slug)
  if ("refused" in read) return refused(read.refused, DATA)
  return appliedWorkload(given.root, slug, read.servable, argv.includes(DRY_RUN))
}
