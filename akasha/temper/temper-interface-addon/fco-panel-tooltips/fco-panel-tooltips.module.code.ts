import {
  tooltipBorderSizeHack,
  tooltipScalingHack,
} from "../fco-tooltips/fco-tooltips.module.code.ts"
import type { AddonSettings } from "../fco-types/fco-types.module.code.ts"

export function buildTooltipsControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Tooltips" },
    {
      type: "slider",
      name: "Item tooltip border width",
      tooltip: "Change the item tooltips border width. Default value: 416",
      min: 100,
      max: 1440,
      step: 1,
      getFunc: () => settings.tooltipSizeItemBorder,
      setFunc: (value) => {
        settings.tooltipSizeItemBorder = value
        tooltipBorderSizeHack()
      },
      default: defaults.tooltipSizeItemBorder,
      width: "full",
    },
    {
      type: "slider",
      name: "Popup tooltip border width",
      tooltip: "Change the popup tooltips border width. Default value: 416",
      min: 100,
      max: 1440,
      step: 1,
      getFunc: () => settings.tooltipSizePopupBorder,
      setFunc: (value) => {
        settings.tooltipSizePopupBorder = value
        tooltipBorderSizeHack()
      },
      default: defaults.tooltipSizePopupBorder,
      width: "full",
    },
    {
      type: "slider",
      name: "Comparative tooltip border width",
      tooltip: "Change the comparative tooltips border width. Default value: 416",
      min: 100,
      max: 1440,
      step: 1,
      getFunc: () => settings.tooltipSizeComparativeBorder,
      setFunc: (value) => {
        settings.tooltipSizeComparativeBorder = value
        tooltipBorderSizeHack()
      },
      default: defaults.tooltipSizeComparativeBorder,
      width: "full",
    },
    {
      type: "slider",
      name: "Item tooltip scale",
      tooltip: "Make the item tooltips texts scale by this percentage value, instead of 100% size.",
      min: 25,
      max: 150,
      step: 0.5,
      getFunc: () => settings.tooltipSizeItemScaleHackPercentage,
      setFunc: (value) => {
        settings.tooltipSizeItemScaleHackPercentage = value
        tooltipScalingHack()
      },
      default: defaults.tooltipSizeItemScaleHackPercentage,
      width: "full",
    },
    {
      type: "slider",
      name: "Popup tooltip scale",
      tooltip:
        "Make the popup tooltips texts scale by this percentage value, instead of 100% size.",
      min: 25,
      max: 150,
      step: 0.5,
      getFunc: () => settings.tooltipSizePopupScaleHackPercentage,
      setFunc: (value) => {
        settings.tooltipSizePopupScaleHackPercentage = value
        tooltipScalingHack()
      },
      default: defaults.tooltipSizeItemScaleHackPercentage,
      width: "full",
    },
    {
      type: "slider",
      name: "Comparative tooltip scale",
      tooltip:
        "Make the comparative tooltips texts scale by this percentage value, instead of 100% size.",
      min: 25,
      max: 150,
      step: 0.5,
      getFunc: () => settings.tooltipSizeComparativeScaleHackPercentage,
      setFunc: (value) => {
        settings.tooltipSizeComparativeScaleHackPercentage = value
        tooltipScalingHack()
      },
      default: defaults.tooltipSizeComparativeScaleHackPercentage,
      width: "full",
    },
  ]
}
