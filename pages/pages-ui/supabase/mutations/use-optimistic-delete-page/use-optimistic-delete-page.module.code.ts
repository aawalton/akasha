import type { DeletePageArgs } from "@akasha/pages-access/delete"
import type { Page } from "@akasha/pages-core/page-types"
import { runOptimisticMutation } from "@akasha/pages-ui/supabase/mutations/apply-prediction"
import { extractTargetIds } from "@akasha/pages-ui/supabase/mutations/extract-target-ids"
import type { PagesMutationPlan } from "@akasha/pages-ui-store/optimistic/plan"

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
