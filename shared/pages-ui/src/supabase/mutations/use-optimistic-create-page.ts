import type { CreatePageArgs } from "@shared/pages-access/create"
import type { Page } from "@shared/pages-core/page-types"
import { type PagesMutationPlan } from "@shared/pages-ui-store/optimistic/plan"
import { getPagesStore } from "@shared/pages-ui-store/singleton"
import { runOptimisticMutation } from "./apply-prediction"
import { buildPredictedRow } from "./build-predicted-row"
import { resolvePageTypeId } from "./collection-lookup"

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
