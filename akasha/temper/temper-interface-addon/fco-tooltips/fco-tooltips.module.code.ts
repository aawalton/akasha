import { STATE } from "../fco-state/fco-state.module.code.ts"

export function tooltipBorderSizeHack(this: void): undefined {
  const settings = STATE.settingsVars.settings
  const widthNormal = 416
  const heightMax = 1440
  const heightMaxComparative = 8192

  const itemBorderSize = settings.tooltipSizeItemBorder ?? widthNormal
  ItemTooltip.SetDimensionConstraints(itemBorderSize, 0, itemBorderSize, heightMax)

  const popupBorderSize = settings.tooltipSizePopupBorder ?? widthNormal
  PopupTooltip.SetDimensionConstraints(popupBorderSize, 0, popupBorderSize, heightMax)

  const comparativeBorderSize = settings.tooltipSizeComparativeBorder ?? widthNormal
  ComparativeTooltip1.SetDimensionConstraints(
    comparativeBorderSize,
    0,
    comparativeBorderSize,
    heightMaxComparative
  )
  ComparativeTooltip2.SetDimensionConstraints(
    comparativeBorderSize,
    0,
    comparativeBorderSize,
    heightMaxComparative
  )
}

export function tooltipScalingHack(this: void): undefined {
  const settings = STATE.settingsVars.settings
  const scaleNormal = 1
  let itemScale = scaleNormal
  let popupScale = scaleNormal
  let comparativeScale = scaleNormal

  const itemPercentage = settings.tooltipSizeItemScaleHackPercentage
  if (itemPercentage < 100 || itemPercentage > 100) {
    itemScale = itemPercentage / 100
    if (itemScale < 0.01) {
      itemScale = 0.01
    }
    if (itemScale > 1.5) {
      itemScale = 1.5
    }
  }

  const popupPercentage = settings.tooltipSizePopupScaleHackPercentage
  if (popupPercentage < 100 || popupPercentage > 100) {
    popupScale = popupPercentage / 100
    if (popupScale < 0.01) {
      popupScale = 0.01
    }
    if (popupScale > 1.5) {
      popupScale = 1.5
    }
  }

  const comparativePercentage = settings.tooltipSizeComparativeScaleHackPercentage
  if (comparativePercentage < 100 || comparativePercentage > 100) {
    comparativeScale = comparativePercentage / 100
    if (comparativeScale < 0.01) {
      comparativeScale = 0.01
    }
    if (comparativeScale > 1.5) {
      comparativeScale = 1.5
    }
  }

  ItemTooltip.SetScale(itemScale)
  PopupTooltip.SetScale(popupScale)
  ComparativeTooltip1.SetScale(comparativeScale)
  ComparativeTooltip2.SetScale(comparativeScale)
}

export function tooltipSizeHacks(this: void): undefined {
  tooltipBorderSizeHack()
  tooltipScalingHack()
}

export function tooltipChanges(this: void): undefined {
  tooltipSizeHacks()
}
