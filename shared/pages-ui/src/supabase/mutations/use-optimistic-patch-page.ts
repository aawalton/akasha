import type { PatchPageArgs } from "@shared/pages-access/patch"
import type { Page } from "@shared/pages-core/page-types"
import type { PagesMutationPlan } from "@shared/pages-ui-store/optimistic/plan"
import type { InteractionToken } from "../../perf/page-card-perf.ts"
import { runOptimisticMutation } from "./apply-prediction.ts"
import { buildOverlay, buildPatchPlan } from "./build-patch-plan.ts"
import { extractTargetIds } from "./extract-target-ids.ts"

export function useOptimisticPatchPage(mutate: (args: PatchPageArgs) => Promise<Page | null>) {
  return async (args: PatchPageArgs, perfToken?: InteractionToken): Promise<Page | null> => {
    const ids = extractTargetIds(args.where)
    if (!ids) return mutate(args)
    const overlay = buildOverlay(buildPatchPlan({ set: args.set, patch: args.patch }))
    const plans: PagesMutationPlan[] = ids.map((id) => ({ kind: "patch", rowId: id, overlay }))
    return runOptimisticMutation({ plans, mutate: () => mutate(args), perfToken })
  }
}
