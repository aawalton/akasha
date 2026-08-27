import type { DeletePageArgs } from "@shared/pages-access/delete"
import type { Page } from "@shared/pages-core/page-types"
import type { PagesMutationPlan } from "@shared/pages-ui-store/optimistic/plan"
import { runOptimisticMutation } from "./apply-prediction"
import { extractTargetIds } from "./extract-target-ids"

export function useOptimisticHardDeletePages(
  mutate: (args: DeletePageArgs) => Promise<readonly Page[]>
) {
  return async (args: DeletePageArgs): Promise<readonly Page[]> => {
    const ids = extractTargetIds(args.where)
    if (!ids) return mutate(args)
    const plans: PagesMutationPlan[] = ids.map((id) => ({ kind: "hard-delete", rowId: id }))
    return runOptimisticMutation({ plans, mutate: () => mutate(args) })
  }
}
