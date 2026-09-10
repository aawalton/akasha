import type { DeletePageArgs } from "akasha/pages/access/deleting/deleting.module.code.ts"
import type { Page } from "akasha/pages/core/page-types/page-types.module.code.ts"
import { runOptimisticMutation } from "akasha/pages/ui/supabase/mutations/apply-prediction/apply-prediction.module.code.ts"
import { extractTargetIds } from "akasha/pages/ui/supabase/mutations/extract-target-ids/extract-target-ids.module.code.ts"
import type { PagesMutationPlan } from "akasha/pages/ui-store/optimistic/plan/plan.module.code.ts"

export function useOptimisticDeletePages(
  mutate: (args: DeletePageArgs) => Promise<readonly Page[]>
) {
  return async (args: DeletePageArgs): Promise<readonly Page[]> => {
    const ids = extractTargetIds(args.where)
    if (!ids) return mutate(args)
    const plans: PagesMutationPlan[] = ids.map((id) => ({
      kind: "delete",
      rowId: id,
    }))
    return runOptimisticMutation({ plans, mutate: () => mutate(args) })
  }
}
