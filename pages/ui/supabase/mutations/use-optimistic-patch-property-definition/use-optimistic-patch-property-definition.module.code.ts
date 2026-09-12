import type {
  PatchPropertyDefinitionArgs,
  PatchPropertyDefinitionByIdArgs,
} from "akasha/pages/access/property-definition/property-definition.module.code.ts"
import type { Page } from "akasha/pages/core/page-types/page-types.module.code.ts"
import { extractTargetIds } from "akasha/pages/ui/supabase/mutations/extract-target-ids/extract-target-ids.module.code.ts"
import { runOptimisticMutation } from "akasha/pages/ui/supabase/mutations/modules/apply-prediction/apply-prediction.module.code.ts"
import {
  buildOverlay,
  buildPatchPlan,
} from "akasha/pages/ui/supabase/mutations/modules/build-patch-plan/build-patch-plan.module.code.ts"
import type { PagesMutationPlan } from "akasha/pages/ui-store/optimistic/plan/plan.module.code.ts"

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
