import { asStringOpt } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { buildSetDataText } from "../lib-sets-set-text-set-data-text-index/lib-sets-set-text-set-data-text-index.module.code.ts"
import { asNever } from "../lib-sets-tip-casts/lib-sets-tip-casts.module.code.ts"
import {
  getLastItemLink,
  isTooltipOfSetItem,
} from "../lib-sets-tip-item-link/lib-sets-tip-item-link.module.code.ts"

interface AnyTooltipControl {
  AddVerticalPadding?: (this: AnyTooltipControl, paddingY: number) => void
  AddLine: (this: AnyTooltipControl, text: string, ...rest: unknown[]) => void
  AcquireSection?: (this: AnyTooltipControl, style: unknown) => GamepadSection
  GetStyle?: (this: AnyTooltipControl, styleName: string) => unknown
  AddSection?: (this: AnyTooltipControl, section: GamepadSection) => void
}
interface GamepadSection {
  AddLine: (this: GamepadSection, text: string, style?: unknown) => void
}

export function addTooltipLine(
  this: void,
  tooltipControl: AnyTooltipControl,
  setData: { [key: string]: unknown },
  itemLink: string | undefined,
  isGamePad?: boolean
): undefined {
  const [setInfoText] = buildSetDataText(setData, itemLink, true)
  if (setInfoText === undefined || setInfoText === "") {
    return
  }

  if (!isGamePad) {
    if (tooltipControl.AddVerticalPadding !== undefined) {
      tooltipControl.AddVerticalPadding(5)
    }
    ZO_Tooltip_AddDivider(asNever(tooltipControl))
    tooltipControl.AddLine(setInfoText)
  } else {
    const acquire = tooltipControl.AcquireSection
    const getStyle = tooltipControl.GetStyle
    const addSection = tooltipControl.AddSection
    if (acquire !== undefined && getStyle !== undefined && addSection !== undefined) {
      const libSetsSection = acquire.call(
        tooltipControl,
        getStyle.call(tooltipControl, "bodySection")
      )
      libSetsSection.AddLine.call(
        libSetsSection,
        "LibSets",
        getStyle.call(tooltipControl, "bodyHeader")
      )
      libSetsSection.AddLine.call(
        libSetsSection,
        setInfoText,
        getStyle.call(tooltipControl, "bodyDescription")
      )
      addSection.call(tooltipControl, libSetsSection)
    }
  }
}

export function tooltipItemCheck(
  this: void,
  tooltipControl: unknown,
  tooltipData: unknown,
  isGamePad?: boolean
): LuaMultiReturn<[boolean, number | undefined, string | undefined]> {
  let itemLink: string | undefined
  let setIdOfCraftableSet: number | undefined
  if (!isGamePad) {
    ;[itemLink, setIdOfCraftableSet] = getLastItemLink(tooltipControl)
  } else {
    itemLink = asStringOpt(tooltipData)
  }
  if (itemLink === undefined || itemLink === "") {
    return $multi(false, undefined, undefined)
  }
  const [isSet, setId] = isTooltipOfSetItem(itemLink)
  if (setIdOfCraftableSet !== undefined && setId !== setIdOfCraftableSet) {
    return $multi(false, undefined, undefined)
  }
  return $multi(isSet, setId, itemLink)
}
