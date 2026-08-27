import type { PatchPageArgs } from "@shared/pages-access/patch"
import type { Page } from "@shared/pages-core/page-types"
import type { PagesMutationPlan } from "@shared/pages-ui-store/optimistic/plan"
import { runOptimisticMutation } from "./apply-prediction"
import { buildOverlay, buildPatchPlan } from "./build-patch-plan"
import { extractTargetIds } from "./extract-target-ids"

export function useOptimisticPatchPages(mutate: (args: PatchPageArgs) => Promise<readonly Page[]>) {
  return async (args: PatchPageArgs): Promise<readonly Page[]> => {
    const ids = extractTargetIds(args.where)
    if (!ids) return mutate(args)
    const overlay = buildOverlay(buildPatchPlan({ set: args.set, patch: args.patch }))
    const plans: PagesMutationPlan[] = ids.map((id) => ({ kind: "patch", rowId: id, overlay }))
    return runOptimisticMutation({ plans, mutate: () => mutate(args) })
  }
}
