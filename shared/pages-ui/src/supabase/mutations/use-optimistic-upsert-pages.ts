import type { UpsertPagesArgs } from "@shared/pages-access/upsert"
import type { Page } from "@shared/pages-core/page-types"
import type { PagesMutationPlan } from "@shared/pages-ui-store/optimistic/plan"
import { runOptimisticMutation } from "./apply-prediction"
import { buildOverlay, buildPatchPlan } from "./build-patch-plan"
import { extractTargetIds } from "./extract-target-ids"

export function useOptimisticUpsertPages(
  mutate: (args: UpsertPagesArgs) => Promise<readonly Page[]>
) {
  return async (args: UpsertPagesArgs): Promise<readonly Page[]> => {
    const plans: PagesMutationPlan[] = []
    for (const item of args.items) {
      const ids = extractTargetIds(item.where)
      if (!ids) continue
      const overlay = buildOverlay(buildPatchPlan({ set: item.set }))
      for (const id of ids) plans.push({ kind: "patch", rowId: id, overlay })
    }
    return runOptimisticMutation({ plans, mutate: () => mutate(args) })
  }
}
