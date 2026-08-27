import type { PatchPropertyDefinitionArgs, PatchPropertyDefinitionByIdArgs } from "@shared/pages-access/property-definition"
import type { Page } from "@shared/pages-core/page-types"
import type { PagesMutationPlan } from "@shared/pages-ui-store/optimistic/plan"
import { runOptimisticMutation } from "./apply-prediction"
import { buildOverlay, buildPatchPlan } from "./build-patch-plan"
import { extractTargetIds } from "./extract-target-ids"

export function useOptimisticPatchPropertyDefinition(
  mutate: (args: PatchPropertyDefinitionByIdArgs) => Promise<Page | null>
) {
  return async (args: PatchPropertyDefinitionArgs): Promise<Page | null> => {
    const ids = extractTargetIds(args.where)
    if (!ids || ids.length === 0) return null
    const overlay = buildOverlay(buildPatchPlan({ set: args.set }))
    const plans: PagesMutationPlan[] = ids.map((id) => ({ kind: "patch", rowId: id, overlay }))
    return runOptimisticMutation({
      plans,
      mutate: async () => {
        let result: Page | null = null
        for (const id of ids) {
          result = await mutate({ id, set: args.set, patch: args.patch, select: args.select })
        }
        return result
      },
    })
  }
}
