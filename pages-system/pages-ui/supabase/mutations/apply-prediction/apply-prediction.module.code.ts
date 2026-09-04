import {
  type InteractionToken,
  recordPglitePersisted,
  recordRoundTripSettled,
  recordVisibleUpdate,
} from "@akasha/pages-ui/perf/page-card-perf"
import { runPagesOptimisticMutation } from "@akasha/pages-ui-store/optimistic/optimistic-mutation"
import type { PagesMutationPlan } from "@akasha/pages-ui-store/optimistic/plan"
import { getPagesStore } from "@akasha/pages-ui-store/singleton"

export async function runOptimisticMutation<Result>(args: {
  readonly plans: readonly PagesMutationPlan[]
  readonly mutate: () => Promise<Result>
  readonly perfToken?: InteractionToken
}): Promise<Result> {
  const { plans, mutate, perfToken } = args
  if (plans.length === 0) return mutate()

  const store = await getPagesStore()
  const resultPromise = runPagesOptimisticMutation(store.collection, plans, mutate)
  if (perfToken !== undefined) {
    recordPglitePersisted(perfToken)
    requestAnimationFrame(() => {
      recordVisibleUpdate(perfToken)
    })
  }
  const result = await resultPromise
  if (perfToken !== undefined) {
    requestAnimationFrame(() => {
      recordRoundTripSettled(perfToken)
    })
  }
  return result
}
