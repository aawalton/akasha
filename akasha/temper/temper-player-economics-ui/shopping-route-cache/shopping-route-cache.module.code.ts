import type { ShoppingPlan } from "@akasha/temper-shopping/ttc-shopping-types"
import { z } from "zod"
import type { OptimizerState } from "../shopping-optimizer-types/shopping-optimizer-types.module.code.ts"
import { shoppingPlanSchema } from "../shopping-plan-schema/shopping-plan-schema.module.code.ts"

function routeStorageKey(userId: string | null): string {
  return `temper:shopping:route:${userId}`
}

interface CachedRoute {
  plan: ShoppingPlan
  currentLocationIndex: number
  missingItems: readonly string[]
  initialPurchaseCount: number
  purchasedCount: number
  completedLocationCount: number
  spentTotal: number
}

const cachedRouteSchema = z
  .object({
    plan: shoppingPlanSchema,
    currentLocationIndex: z.number(),
    missingItems: z.array(z.string()),
    initialPurchaseCount: z.number().default(0),
    purchasedCount: z.number().default(0),
    completedLocationCount: z.number().default(0),
    spentTotal: z.number().default(0),
  })
  .strict()

export function loadCachedRoute(userId: string | null): OptimizerState | null {
  const key = routeStorageKey(userId)

  let raw: string | null
  try {
    raw = localStorage.getItem(key)
  } catch {
    return null
  }
  if (raw == null) return null

  let cached: z.infer<typeof cachedRouteSchema> | null = null
  try {
    const result = cachedRouteSchema.safeParse(JSON.parse(raw))
    if (result.success) cached = result.data
  } catch {
    cached = null
  }

  if (cached == null) {
    try {
      localStorage.removeItem(key)
    } catch {}
    return null
  }

  return {
    status: "complete",
    plan: cached.plan,
    progress: 100,
    searchCompleted: 0,
    searchTotal: 0,
    currentLocationIndex: cached.currentLocationIndex,
    error: null,
    missingItems: new Set(cached.missingItems),
    initialPurchaseCount: cached.initialPurchaseCount,
    purchasedCount: cached.purchasedCount,
    completedLocationCount: cached.completedLocationCount,
    spentTotal: cached.spentTotal,
  }
}

export function saveCachedRoute(state: OptimizerState, userId: string | null): undefined {
  const key = routeStorageKey(userId)
  try {
    if (state.status !== "complete" || !state.plan) {
      localStorage.removeItem(key)
      return
    }
    const cached: CachedRoute = {
      plan: state.plan,
      currentLocationIndex: state.currentLocationIndex,
      missingItems: [...state.missingItems],
      initialPurchaseCount: state.initialPurchaseCount,
      purchasedCount: state.purchasedCount,
      completedLocationCount: state.completedLocationCount,
      spentTotal: state.spentTotal,
    }
    localStorage.setItem(key, JSON.stringify(cached))
  } catch {}
}

export function clearCachedRoute(userId: string | null): undefined {
  try {
    localStorage.removeItem(routeStorageKey(userId))
  } catch {}
}
