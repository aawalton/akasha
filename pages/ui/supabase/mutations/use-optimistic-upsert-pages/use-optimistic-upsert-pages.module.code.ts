import type { UpsertPagesArgs } from "akasha/pages/access/upsert/upsert.module.code.ts"
import type { Page } from "akasha/pages/core/page-types/page-types.module.code.ts"
import {
  buildOverlay,
  buildPatchPlan,
} from "akasha/pages/ui/supabase/mutations/build-patch-plan/build-patch-plan.module.code.ts"
import { extractTargetIds } from "akasha/pages/ui/supabase/mutations/extract-target-ids/extract-target-ids.module.code.ts"
import { runOptimisticMutation } from "akasha/pages/ui/supabase/mutations/modules/apply-prediction/apply-prediction.module.code.ts"
import type { PagesMutationPlan } from "akasha/pages/ui-store/optimistic/plan/plan.module.code.ts"

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
