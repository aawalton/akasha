import { runOptimisticMutation } from "@akasha/pages-ui/supabase/mutations/apply-prediction"
import { buildPredictedRow } from "@akasha/pages-ui/supabase/mutations/build-predicted-row"
import { resolvePageTypeId } from "@akasha/pages-ui/supabase/mutations/collection-lookup"
import type { CreatePageArgs } from "akasha/pages/access/create/create.module.code.ts"
import type { Page } from "akasha/pages/core/page-types/page-types.module.code.ts"
import type { PagesMutationPlan } from "akasha/pages/ui-store/optimistic/plan/plan.module.code.ts"
import { getPagesStore } from "akasha/pages/ui-store/singleton/singleton.module.code.ts"

export function useOptimisticCreatePage(mutate: (args: CreatePageArgs) => Promise<Page>) {
  return async (args: CreatePageArgs): Promise<Page> => {
    const store = await getPagesStore()
    const pageTypeId = resolvePageTypeId(store.collection, args.pageTypeSlug)
    if (pageTypeId === null) {
      return runOptimisticMutation({ plans: [], mutate: () => mutate(args) })
    }
    const id = args.id ?? crypto.randomUUID()
    const row = buildPredictedRow(id, pageTypeId, {
      pageTypeSlug: args.pageTypeSlug,
      properties: args.properties,
    })
    const plan: PagesMutationPlan = { kind: "create", row }
    return runOptimisticMutation({ plans: [plan], mutate: () => mutate({ ...args, id }) })
  }
}
