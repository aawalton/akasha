import type { UpsertPageArgs } from "@shared/pages-access/upsert"
import type { Page } from "@shared/pages-core/page-types"
import type { PagesMutationPlan } from "@shared/pages-ui-store/optimistic/plan"
import { runOptimisticMutation } from "./apply-prediction"
import { buildOverlay, buildPatchPlan } from "./build-patch-plan"
import { extractTargetIds } from "./extract-target-ids"

export function useOptimisticUpsertPage(mutate: (args: UpsertPageArgs) => Promise<Page>) {
  return async (args: UpsertPageArgs): Promise<Page> => {
    const ids = extractTargetIds(args.where)
    if (!ids) return mutate(args)
    const overlay = buildOverlay(buildPatchPlan({ set: args.set }))
    const plans: PagesMutationPlan[] = ids.map((id) => ({ kind: "patch", rowId: id, overlay }))
    return runOptimisticMutation({ plans, mutate: () => mutate(args) })
  }
}
