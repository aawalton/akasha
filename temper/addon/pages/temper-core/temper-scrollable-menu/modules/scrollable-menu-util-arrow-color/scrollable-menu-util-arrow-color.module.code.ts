import { asLsmCastComboBoxLikeUndefined } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastGetOptionsThisUnknownRecordStringUnknown } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-1c/scrollable-menu-casts-1c.module.code.ts"
import { asLsmCastRecordStringZoColorDef } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastSetColorThisUnknownRNumberGNumberBNumberANumbe } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-2c/scrollable-menu-casts-2c.module.code.ts"
import { asZoColorDef } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"
import {
  constants,
  getValueOrCallback,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"

const colorConstants = asLsmCastRecordStringZoColorDef(constants.colors)

export function subMenuArrowColor(
  this: void,
  control: Record<string, unknown>,
  _data: unknown
): undefined {
  if (control.m_arrow === undefined) {
    return
  }
  const comboBox = asLsmCastComboBoxLikeUndefined(control.m_owner)
  const isMultiSelectionEnabled = comboBox?.m_enableMultiSelect || false
  const isMultiSelectSubmenuEntrySelected =
    (isMultiSelectionEnabled === true && control.isAnySubmenuEntrySelected) || false

  const options =
    (comboBox !== undefined &&
      asLsmCastGetOptionsThisUnknownRecordStringUnknown(comboBox).GetOptions()) ||
    undefined
  const multiSelectSubmenuSelectedArrowColor =
    (isMultiSelectSubmenuEntrySelected === true &&
      options !== undefined &&
      getValueOrCallback(options.multiSelectSubmenuSelectedArrowColor, options)) ||
    colorConstants.DEFAULT_ARROW_COLOR
  const submenuArrowColor =
    (!isMultiSelectSubmenuEntrySelected &&
      options !== undefined &&
      getValueOrCallback(options.submenuArrowColor, options)) ||
    colorConstants.DEFAULT_ARROW_COLOR

  const newColor =
    (isMultiSelectSubmenuEntrySelected === true && multiSelectSubmenuSelectedArrowColor) ||
    (!isMultiSelectSubmenuEntrySelected && submenuArrowColor) ||
    colorConstants.DEFAULT_ARROW_COLOR
  if (newColor !== undefined) {
    const [r, g, b, a] = asZoColorDef(newColor).UnpackRGBA()
    asLsmCastSetColorThisUnknownRNumberGNumberBNumberANumbe(control.m_arrow).SetColor(r, g, b, a)
  }
}
