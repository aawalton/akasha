import type { CreatePageArgs } from "akasha/page/access/modules/create/create.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { uuidVersion7 } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import { runOptimisticMutation } from "akasha/page/ui/supabase/mutation/modules/apply-prediction/apply-prediction.module.code.ts"
import { buildPredictedRow } from "akasha/page/ui/supabase/mutation/modules/build-predicted-row/build-predicted-row.module.code.ts"
import { resolvePageTypeId } from "akasha/page/ui/supabase/mutation/modules/collection-lookup/collection-lookup.module.code.ts"
import { getPagesStore } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import type { PagesMutationPlan } from "akasha/page/ui-store/optimistic/modules/plan/plan.module.code.ts"

export function useOptimisticCreatePage(mutate: (args: CreatePageArgs) => Promise<Page>) {
  return async (args: CreatePageArgs): Promise<Page> => {
    const store = await getPagesStore()
    const pageTypeId = resolvePageTypeId(store.collection, args.pageTypeSlug)
    if (pageTypeId === null) {
      return runOptimisticMutation({ plans: [], mutate: () => mutate(args) })
    }
    const id = args.id ?? uuidVersion7()
    const row = buildPredictedRow(id, pageTypeId, {
      pageTypeSlug: args.pageTypeSlug,
      properties: args.properties,
    })
    const plan: PagesMutationPlan = { kind: "create", row }
    return runOptimisticMutation({ plans: [plan], mutate: () => mutate({ ...args, id }) })
  }
}
