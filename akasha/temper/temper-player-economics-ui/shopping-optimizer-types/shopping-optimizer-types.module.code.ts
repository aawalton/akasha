import type { ShoppingSettings } from "@akasha/temper-shopping/shopping-settings"
import type {
  PurchaseRecommendation,
  ShoppingPlan,
} from "@akasha/temper-shopping/ttc-shopping-types"

type OptimizerStatus = "idle" | "searching" | "complete" | "error"

export interface OptimizerState {
  status: OptimizerStatus
  plan: ShoppingPlan | null
  progress: number
  searchCompleted: number
  searchTotal: number
  currentLocationIndex: number
  error: string | null
  missingItems: Set<string>
  initialPurchaseCount: number
  purchasedCount: number
  completedLocationCount: number
  spentTotal: number
}

export interface LocationPurchase {
  guildName: string
  purchases: readonly PurchaseRecommendation[]
}

export interface LocationSummary {
  location: string
  itemCount: number
  cost: number
}

export interface OptimizerDerived {
  currentLocation: string | null
  locationPurchases: readonly LocationPurchase[]
  routeSummary: readonly LocationSummary[]
  locationCount: number
  currentLocationCost: number
  stopNumber: number
  totalStops: number
}

export interface NotAvailableParam {
  raw: ShoppingSettings | null
  userId: string | null
}

export type ShoppingMarks = ShoppingSettings | Record<string, boolean> | undefined

export type UpdateShoppingMarks = (keys: readonly string[]) => Promise<void>
