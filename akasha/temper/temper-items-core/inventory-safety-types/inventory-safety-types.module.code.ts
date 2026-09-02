export type DestructiveAction = "deconstruct" | "refine" | "sell" | "research" | "destroy" | "buy"

export const DESTRUCTIVE_ACTIONS: { value: DestructiveAction; label: string }[] = [
  { value: "deconstruct", label: "Deconstruct" },
  { value: "refine", label: "Refine" },
  { value: "sell", label: "Sell" },
  { value: "research", label: "Research" },
  { value: "destroy", label: "Destroy" },
  { value: "buy", label: "Buy" },
]

export const ALL_DESTRUCTIVE_ACTIONS: DestructiveAction[] = DESTRUCTIVE_ACTIONS.map((a) => a.value)

export interface InventorySafetySettings {
  confirmActions: readonly DestructiveAction[]
  openCooldownProtection: boolean
}
