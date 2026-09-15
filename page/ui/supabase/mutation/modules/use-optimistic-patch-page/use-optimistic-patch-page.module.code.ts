import type { PatchPageArgs } from "akasha/page/access/modules/patch/patch.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { InteractionToken } from "akasha/page/ui/modules/page-card-perf/page-card-perf.module.code.ts"
import { runOptimisticMutation } from "akasha/page/ui/supabase/mutation/modules/apply-prediction/apply-prediction.module.code.ts"
import {
  buildOverlay,
  buildPatchPlan,
} from "akasha/page/ui/supabase/mutation/modules/build-patch-plan/build-patch-plan.module.code.ts"
import { extractTargetIds } from "akasha/page/ui/supabase/mutation/modules/extract-target-ids/extract-target-ids.module.code.ts"
import type { PagesMutationPlan } from "akasha/page/ui-store/optimistic/modules/plan/plan.module.code.ts"

export function useOptimisticPatchPage(mutate: (args: PatchPageArgs) => Promise<Page | null>) {
  return async (args: PatchPageArgs, perfToken?: InteractionToken): Promise<Page | null> => {
    const ids = extractTargetIds(args.where)
    if (!ids) return mutate(args)
    const overlay = buildOverlay(buildPatchPlan({ set: args.set, patch: args.patch }))
    const plans: PagesMutationPlan[] = ids.map((id) => ({ kind: "patch", rowId: id, overlay }))
    return runOptimisticMutation({ plans, mutate: () => mutate(args), perfToken })
  }
}
