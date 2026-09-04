import type {
  PatchPropertyDefinitionArgs,
  PatchPropertyDefinitionByIdArgs,
} from "@akasha/pages-access/property-definition"
import type { Page } from "@akasha/pages-core/page-types"
import { runOptimisticMutation } from "@akasha/pages-ui/supabase/mutations/apply-prediction"
import { buildOverlay, buildPatchPlan } from "@akasha/pages-ui/supabase/mutations/build-patch-plan"
import { extractTargetIds } from "@akasha/pages-ui/supabase/mutations/extract-target-ids"
import type { PagesMutationPlan } from "@akasha/pages-ui-store/optimistic/plan"

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
