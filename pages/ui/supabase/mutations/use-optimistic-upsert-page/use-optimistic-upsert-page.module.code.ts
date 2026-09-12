import type { UpsertPageArgs } from "akasha/pages/access/upsert/upsert.module.code.ts"
import type { Page } from "akasha/pages/core/page-types/page-types.module.code.ts"
import { extractTargetIds } from "akasha/pages/ui/supabase/mutations/extract-target-ids/extract-target-ids.module.code.ts"
import { runOptimisticMutation } from "akasha/pages/ui/supabase/mutations/modules/apply-prediction/apply-prediction.module.code.ts"
import {
  buildOverlay,
  buildPatchPlan,
} from "akasha/pages/ui/supabase/mutations/modules/build-patch-plan/build-patch-plan.module.code.ts"
import type { PagesMutationPlan } from "akasha/pages/ui-store/optimistic/plan/plan.module.code.ts"

export function useOptimisticUpsertPage(mutate: (args: UpsertPageArgs) => Promise<Page>) {
  return async (args: UpsertPageArgs): Promise<Page> => {
    const ids = extractTargetIds(args.where)
    if (!ids) return mutate(args)
    const overlay = buildOverlay(buildPatchPlan({ set: args.set }))
    const plans: PagesMutationPlan[] = ids.map((id) => ({ kind: "patch", rowId: id, overlay }))
    return runOptimisticMutation({ plans, mutate: () => mutate(args) })
  }
}
