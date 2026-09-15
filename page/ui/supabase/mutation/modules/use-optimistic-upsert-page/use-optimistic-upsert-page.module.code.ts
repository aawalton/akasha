import type { UpsertPageArgs } from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { runOptimisticMutation } from "akasha/page/ui/supabase/mutation/modules/apply-prediction/apply-prediction.module.code.ts"
import {
  buildOverlay,
  buildPatchPlan,
} from "akasha/page/ui/supabase/mutation/modules/build-patch-plan/build-patch-plan.module.code.ts"
import { extractTargetIds } from "akasha/page/ui/supabase/mutation/modules/extract-target-ids/extract-target-ids.module.code.ts"
import type { PagesMutationPlan } from "akasha/page/ui-store/optimistic/modules/plan/plan.module.code.ts"

export function useOptimisticUpsertPage(mutate: (args: UpsertPageArgs) => Promise<Page>) {
  return async (args: UpsertPageArgs): Promise<Page> => {
    const ids = extractTargetIds(args.where)
    if (!ids) return mutate(args)
    const overlay = buildOverlay(buildPatchPlan({ set: args.set }))
    const plans: PagesMutationPlan[] = ids.map((id) => ({ kind: "patch", rowId: id, overlay }))
    return runOptimisticMutation({ plans, mutate: () => mutate(args) })
  }
}
