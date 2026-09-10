import type { PatchPageArgs } from "akasha/pages/access/patch/patch.module.code.ts"
import type { Page } from "akasha/pages/core/page-types/page-types.module.code.ts"
import { runOptimisticMutation } from "akasha/pages/ui/supabase/mutations/apply-prediction/apply-prediction.module.code.ts"
import {
  buildOverlay,
  buildPatchPlan,
} from "akasha/pages/ui/supabase/mutations/build-patch-plan/build-patch-plan.module.code.ts"
import { extractTargetIds } from "akasha/pages/ui/supabase/mutations/extract-target-ids/extract-target-ids.module.code.ts"
import type { PagesMutationPlan } from "akasha/pages/ui-store/optimistic/plan/plan.module.code.ts"

export function useOptimisticPatchPages(mutate: (args: PatchPageArgs) => Promise<readonly Page[]>) {
  return async (args: PatchPageArgs): Promise<readonly Page[]> => {
    const ids = extractTargetIds(args.where)
    if (!ids) return mutate(args)
    const overlay = buildOverlay(buildPatchPlan({ set: args.set, patch: args.patch }))
    const plans: PagesMutationPlan[] = ids.map((id) => ({ kind: "patch", rowId: id, overlay }))
    return runOptimisticMutation({ plans, mutate: () => mutate(args) })
  }
}
