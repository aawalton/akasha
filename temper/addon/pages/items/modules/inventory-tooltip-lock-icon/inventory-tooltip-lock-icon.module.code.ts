import { isTemperLocked } from "akasha/temper/addon/pages/items/modules/inventory-temper-lock-store/inventory-temper-lock-store.module.code.ts"
import "akasha/temper/addon/pages/crafting/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const LOCK_TEXTURE = "EsoUI/Art/Miscellaneous/locked_up.dds"

export function registerTooltipLockIcon(): undefined {
  const lockIcon = WINDOW_MANAGER.CreateControl(
    "TemperItemsTooltipLockIcon",
    ItemTooltip,
    CT_TEXTURE
  )
  lockIcon.SetTexture(LOCK_TEXTURE)
  lockIcon.SetDimensions(24, 24)
  lockIcon.SetAnchor(TOPRIGHT, ItemTooltip, TOPRIGHT, -6, 6)
  lockIcon.SetDrawTier(DT_HIGH)
  lockIcon.SetHidden(true)

  const originalSetBagItem = ItemTooltip.SetBagItem
  ItemTooltip.SetBagItem = function (
    this: TooltipControl,
    bagId: number,
    slotIndex: number,
    displayFlags?: number
  ): undefined {
    originalSetBagItem.call(this, bagId, slotIndex, displayFlags)
    lockIcon.SetHidden(!isTemperLocked(bagId, slotIndex))
  }
}
