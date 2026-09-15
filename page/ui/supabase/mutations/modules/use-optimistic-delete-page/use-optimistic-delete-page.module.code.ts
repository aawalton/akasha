import type { DeletePageArgs } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { runOptimisticMutation } from "akasha/page/ui/supabase/mutations/modules/apply-prediction/apply-prediction.module.code.ts"
import { extractTargetIds } from "akasha/page/ui/supabase/mutations/modules/extract-target-ids/extract-target-ids.module.code.ts"
import type { PagesMutationPlan } from "akasha/page/ui-store/optimistic/modules/plan/plan.module.code.ts"

export function useOptimisticDeletePage(mutate: (args: DeletePageArgs) => Promise<Page | null>) {
  return async (args: DeletePageArgs): Promise<Page | null> => {
    const ids = extractTargetIds(args.where)
    if (!ids) return mutate(args)
    const plans: PagesMutationPlan[] = ids.map((id) => ({
      kind: "delete",
      rowId: id,
    }))
    return runOptimisticMutation({ plans, mutate: () => mutate(args) })
  }
}
