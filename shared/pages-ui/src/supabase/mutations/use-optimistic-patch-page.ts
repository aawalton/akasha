import type { PatchPageArgs } from "@shared/pages-access/patch"
import type { Page } from "@shared/pages-core/page-types"
import type { InteractionToken } from "../../perf/page-card-perf"
import { runOptimisticMutation } from "./apply-prediction"
import { buildAutomationPlans } from "./build-automation-plans"
import { buildOverlay, buildPatchPlan } from "./build-patch-plan"
import { extractTargetIds } from "./extract-target-ids"

export function useOptimisticPatchPage(mutate: (args: PatchPageArgs) => Promise<Page | null>) {
  return async (args: PatchPageArgs, perfToken?: InteractionToken): Promise<Page | null> => {
    const ids = extractTargetIds(args.where)
    if (!ids) return mutate(args)
    const baseOverlay = buildOverlay(buildPatchPlan({ set: args.set, patch: args.patch }))
    const plans = await buildAutomationPlans({
      ids,
      pageTypeSlug: args.pageTypeSlug,
      userSet: args.set,
      baseOverlay,
    })
    return runOptimisticMutation({ plans, mutate: () => mutate(args), perfToken })
  }
}
