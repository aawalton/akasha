import { isTemperLocked } from "../inventory-temper-lock-store/inventory-temper-lock-store.module.code.ts"

const LOCK_TEXTURE = "EsoUI/Art/Miscellaneous/locked_up.dds"

export function registerTooltipLockIcon(): undefined {
  const lockIcon = WINDOW_MANAGER.CreateControl(
    "TemperInventoryTooltipLockIcon",
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
