import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { GREEN } from "akasha/design/interface/token/modules/semantic-color/semantic-color.module.code.ts"
import { styleText } from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import {
  ROW_PADDING_X,
  STAT_ROW_HEIGHT,
} from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import { spaceOf } from "akasha/temper/window/modules/window-spacing/window-spacing.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

export const TWO_HANDED_TYPES: Record<number, boolean> = {
  [WEAPONTYPE_TWO_HANDED_SWORD]: true,
  [WEAPONTYPE_TWO_HANDED_AXE]: true,
  [WEAPONTYPE_TWO_HANDED_HAMMER]: true,
  [WEAPONTYPE_BOW]: true,
  [WEAPONTYPE_FIRE_STAFF]: true,
  [WEAPONTYPE_FROST_STAFF]: true,
  [WEAPONTYPE_LIGHTNING_STAFF]: true,
  [WEAPONTYPE_HEALING_STAFF]: true,
}

const EQUIP_ROW_HEIGHT = STAT_ROW_HEIGHT
const SECTION_COL_LEFT = ROW_PADDING_X
const SECTION_COL_WIDTH = 80
const SLOT_COL_LEFT = SECTION_COL_LEFT + SECTION_COL_WIDTH
const SLOT_COL_WIDTH = 90
const VALUE_COL_LEFT = SLOT_COL_LEFT + SLOT_COL_WIDTH
const VALUE_COL_WIDTH = 220
const UPGRADE_COL_LEFT = VALUE_COL_LEFT + VALUE_COL_WIDTH
const UPGRADE_ICON_GAP = spaceOf("1")
const UPGRADE_ICON_SIZE = 16
const OPTIMAL_COL_LEFT = UPGRADE_COL_LEFT + UPGRADE_ICON_GAP + UPGRADE_ICON_SIZE + spaceOf("4")

export interface EquipmentRow {
  sectionLabel: LabelControl | undefined
  slotLabel: LabelControl
  valueLabel: LabelControl
  upgradeIcon: TextureControl
  optimalLabel: LabelControl
}

export function createEquipRowsForSection(
  parent: Control,
  offsetY: number,
  sectionName: string,
  slots: number[]
): LuaMultiReturn<[EquipmentRow[], number]> {
  const rows: EquipmentRow[] = []

  for (let i = 0; i < slots.length; i++) {
    let sectionLabel: LabelControl | undefined

    if (i === 0) {
      sectionLabel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
      sectionLabel.SetAnchor(TOPLEFT, parent, TOPLEFT, SECTION_COL_LEFT, offsetY)
      sectionLabel.SetDimensions(SECTION_COL_WIDTH, EQUIP_ROW_HEIGHT)
      styleText(sectionLabel, "heading")
      sectionLabel.SetText(sectionName)
      sectionLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
      sectionLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
    }

    const slotLabel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
    slotLabel.SetAnchor(TOPLEFT, parent, TOPLEFT, SLOT_COL_LEFT, offsetY)
    slotLabel.SetDimensions(SLOT_COL_WIDTH, EQUIP_ROW_HEIGHT)
    styleText(slotLabel, "label")
    slotLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    slotLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)

    const valueLabel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
    valueLabel.SetAnchor(TOPLEFT, parent, TOPLEFT, VALUE_COL_LEFT, offsetY)
    valueLabel.SetDimensions(VALUE_COL_WIDTH, EQUIP_ROW_HEIGHT)
    styleText(valueLabel, "body")
    valueLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    valueLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)

    const upgradeIcon = WINDOW_MANAGER.CreateControl(undefined, parent, CT_TEXTURE)
    upgradeIcon.SetAnchor(
      TOPLEFT,
      parent,
      TOPLEFT,
      UPGRADE_COL_LEFT + UPGRADE_ICON_GAP,
      offsetY + (EQUIP_ROW_HEIGHT - UPGRADE_ICON_SIZE) / 2
    )
    upgradeIcon.SetDimensions(UPGRADE_ICON_SIZE, UPGRADE_ICON_SIZE)
    upgradeIcon.SetTexture("/esoui/art/miscellaneous/list_sortup.dds")
    upgradeIcon.SetColor(GREEN[0], GREEN[1], GREEN[2], 1)
    upgradeIcon.SetMouseEnabled(true)
    upgradeIcon.SetHidden(true)

    const optimalLabel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
    optimalLabel.SetAnchor(TOPLEFT, parent, TOPLEFT, OPTIMAL_COL_LEFT, offsetY)
    optimalLabel.SetDimensions(VALUE_COL_WIDTH, EQUIP_ROW_HEIGHT)
    styleText(optimalLabel, "body")
    optimalLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    optimalLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
    optimalLabel.SetHidden(true)

    rows.push({ sectionLabel, slotLabel, valueLabel, upgradeIcon, optimalLabel })
    offsetY = offsetY + EQUIP_ROW_HEIGHT
  }

  return $multi(rows, offsetY)
}
