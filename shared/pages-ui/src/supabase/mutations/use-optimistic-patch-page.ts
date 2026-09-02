import type { PatchPageArgs } from "@akasha/pages-access/patch"
import type { Page } from "@akasha/pages-core/page-types"
import type { PagesMutationPlan } from "@akasha/pages-ui-store/optimistic/plan"
import type { InteractionToken } from "@akasha/pages-ui/perf/page-card-perf"
import { runOptimisticMutation } from "./apply-prediction.ts"
import { buildOverlay, buildPatchPlan } from "@akasha/pages-ui/supabase/mutations/build-patch-plan"
import { extractTargetIds } from "@akasha/pages-ui/supabase/mutations/extract-target-ids"

export function useOptimisticPatchPage(mutate: (args: PatchPageArgs) => Promise<Page | null>) {
  return async (args: PatchPageArgs, perfToken?: InteractionToken): Promise<Page | null> => {
    const ids = extractTargetIds(args.where)
    if (!ids) return mutate(args)
    const overlay = buildOverlay(buildPatchPlan({ set: args.set, patch: args.patch }))
    const plans: PagesMutationPlan[] = ids.map((id) => ({ kind: "patch", rowId: id, overlay }))
    return runOptimisticMutation({ plans, mutate: () => mutate(args), perfToken })
  }
}
