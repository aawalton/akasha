import "@akasha/temper-eso-types/eso-enums-11"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-language-extensions"
import { GREEN } from "@akasha/design-tokens/semantic-color"
import { TEXT_PRIMARY, TEXT_SECONDARY } from "@akasha/design-tokens/text-color"

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

export const EQUIP_ROW_HEIGHT = 28
export const EQUIP_ROW_SPACING = 4
export const SECTION_COL_WIDTH = 80
export const SLOT_COL_WIDTH = 90
export const VALUE_COL_LEFT = SECTION_COL_WIDTH + SLOT_COL_WIDTH
export const VALUE_COL_WIDTH = 220
export const UPGRADE_COL_LEFT = VALUE_COL_LEFT + VALUE_COL_WIDTH
export const OPTIMAL_COL_LEFT = VALUE_COL_LEFT + VALUE_COL_WIDTH + 34

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
      sectionLabel.SetAnchor(TOPLEFT, parent, TOPLEFT, 0, offsetY)
      sectionLabel.SetDimensions(SECTION_COL_WIDTH, EQUIP_ROW_HEIGHT)
      sectionLabel.SetFont("ZoFontGameBold")
      sectionLabel.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
      sectionLabel.SetText(sectionName)
      sectionLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
      sectionLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)
    }

    const slotLabel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
    slotLabel.SetAnchor(TOPLEFT, parent, TOPLEFT, SECTION_COL_WIDTH, offsetY)
    slotLabel.SetDimensions(SLOT_COL_WIDTH, EQUIP_ROW_HEIGHT)
    slotLabel.SetFont("ZoFontGameBold")
    slotLabel.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
    slotLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    slotLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)

    const valueLabel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
    valueLabel.SetAnchor(TOPLEFT, parent, TOPLEFT, VALUE_COL_LEFT, offsetY)
    valueLabel.SetDimensions(VALUE_COL_WIDTH, EQUIP_ROW_HEIGHT)
    valueLabel.SetFont("ZoFontGame")
    valueLabel.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
    valueLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    valueLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)

    const upgradeIcon = WINDOW_MANAGER.CreateControl(undefined, parent, CT_TEXTURE)
    upgradeIcon.SetAnchor(TOPLEFT, parent, TOPLEFT, UPGRADE_COL_LEFT + 2, offsetY + 4)
    upgradeIcon.SetDimensions(16, 16)
    upgradeIcon.SetTexture("/esoui/art/miscellaneous/list_sortup.dds")
    upgradeIcon.SetColor(GREEN[0], GREEN[1], GREEN[2], 1)
    upgradeIcon.SetMouseEnabled(true)
    upgradeIcon.SetHidden(true)

    const optimalLabel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
    optimalLabel.SetAnchor(TOPLEFT, parent, TOPLEFT, OPTIMAL_COL_LEFT, offsetY)
    optimalLabel.SetDimensions(VALUE_COL_WIDTH, EQUIP_ROW_HEIGHT)
    optimalLabel.SetFont("ZoFontGame")
    optimalLabel.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
    optimalLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    optimalLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)
    optimalLabel.SetHidden(true)

    rows.push({ sectionLabel, slotLabel, valueLabel, upgradeIcon, optimalLabel })
    offsetY = offsetY + EQUIP_ROW_HEIGHT + EQUIP_ROW_SPACING
  }

  return $multi(rows, offsetY)
}
