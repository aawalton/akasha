import type { ItemAction } from "../inventory-rule-types/inventory-rule-types.module.code.ts"

export function isBackpackRequiredAction(
  action: ItemAction,
  destination: string | undefined
): boolean {
  if (action === "move-to") return false
  if (action === "stock") return false
  if (action === "character-equip") return false
  if (action === "companion-equip") return false
  if (action === "deconstruct") return false
  if (action === "refine") return false
  if (action === "research") return false
  if (action === "use" && destination !== undefined) return false
  if (action === "nothing") return false
  return true
}
