import type { UpsertPagesArgs } from "@akasha/pages-access/upsert"
import type { Page } from "@akasha/pages-core/page-types"
import { runOptimisticMutation } from "@akasha/pages-ui/supabase/mutations/apply-prediction"
import { buildOverlay, buildPatchPlan } from "@akasha/pages-ui/supabase/mutations/build-patch-plan"
import { extractTargetIds } from "@akasha/pages-ui/supabase/mutations/extract-target-ids"
import type { PagesMutationPlan } from "@akasha/pages-ui-store/optimistic/plan"

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
