import {
  findCooldownGroup,
  getDlcDailyCooldownRemaining,
  isOpenCooldownEnabled,
} from "akasha/temper/addon/pages/items/modules/inventory-open-cooldown-protection/inventory-open-cooldown-protection.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import {
  addTooltipLines,
  type TooltipItem,
  type TooltipLine,
} from "akasha/temper/window/modules/tooltip-lines/tooltip-lines.module.code.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
const COOLDOWN_COLOR = "FF4444"

function remainingOf(this: void, bagId: number, slotIndex: number): number | undefined {
  const group = findCooldownGroup(bagId, slotIndex)
  if (group === undefined) return getDlcDailyCooldownRemaining(bagId, slotIndex)
  const expiry = getSavedVariables().openCooldowns?.[group.key]
  const now = GetTimeStamp()
  if (expiry === undefined || now >= expiry) return undefined
  return expiry - now
}

function cooldownLines(this: void, item: TooltipItem): readonly TooltipLine[] {
  const { bagId, slotIndex } = item
  if (bagId === undefined || slotIndex === undefined || !isOpenCooldownEnabled()) return []
  const remaining = remainingOf(bagId, slotIndex)
  if (remaining === undefined) return []
  const formatted = ZO_FormatTime(
    remaining,
    TIME_FORMAT_STYLE_DESCRIPTIVE_SHORT,
    TIME_FORMAT_PRECISION_SECONDS,
    TIME_FORMAT_DIRECTION_DESCENDING
  )
  return [{ text: `Cooldown: ${formatted}`, color: COOLDOWN_COLOR }]
}

export function registerTooltipHook(): undefined {
  addTooltipLines(cooldownLines)
}
