import "akasha/temper/eso/type/eso-armory/eso-armory.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"
import {
  type ArmoryBuildData,
  buildIconFile,
} from "akasha/temper/addon/pages/characters/modules/characters-armory-build-data/characters-armory-build-data.module.code.ts"
import type { ArmoryBuild } from "akasha/temper/addon/pages/characters/modules/characters-armory-pending/characters-armory-pending.module.code.ts"

export const COLLAPSED_ROW = 1

export const EXPANDED_ROW = 2

export const NEW_BUILD_ROW = 3

const NEW_BUILD_TEXT = "Save as New Build"

const NO_MUNDUS = "None"

const ICON_MARGIN = 10

const ICON_SIZE = 48

export interface ArmoryRow {
  readonly build?: ArmoryBuild
  readonly data?: ArmoryBuildData
}

export interface ArmoryRowActs {
  readonly select: (key: string | undefined) => undefined
  readonly saveNew: () => undefined
}

interface ArmoryAttribute extends Control {
  readonly attributeValue: LabelControl
}

interface ArmoryBuildTaker {
  AssignArmoryBuildData: (this: ArmoryBuildTaker, data: ArmoryBuildData) => void
}

interface ArmoryEquipSlot extends Control {
  readonly equipType: number
  readonly icon: TextureControl
}

interface ArmoryEquipmentRow extends Control {
  buildData?: ArmoryBuildData
}

interface ArmoryEntry extends Control {
  readonly nameLabel: LabelControl
  readonly iconTexture: TextureControl
}

interface ArmoryExpandedEntry extends ArmoryEntry {
  readonly magickaAttribute: ArmoryAttribute
  readonly healthAttribute: ArmoryAttribute
  readonly staminaAttribute: ArmoryAttribute
  readonly championBar: ArmoryBuildTaker
  readonly weaponSetRow1: ArmoryBuildTaker
  readonly weaponSetRow2: ArmoryBuildTaker
  readonly equipmentRow: ArmoryEquipmentRow
  readonly equipmentSlots: readonly ArmoryEquipSlot[]
  readonly mundusLabel: LabelControl
  readonly curseTypeLabel: LabelControl
  readonly outfitNameLabel: LabelControl
}

function onClicked(control: Control | undefined, act: () => undefined): undefined {
  control?.SetHandler("OnMouseUp", (_control: Control, _button: number, upInside: boolean) => {
    if (upInside) act()
  })
  return undefined
}

function matchIconColumn(button: Control | undefined): undefined {
  if (button === undefined) return undefined
  const parent = button.GetParent()
  button.ClearAnchors()
  button.SetAnchor(CENTER, parent, RIGHT, -(ICON_MARGIN + ICON_SIZE / 2), 0)
  return undefined
}

function showHeader(entry: ArmoryEntry, build: ArmoryBuild): undefined {
  entry.nameLabel.SetText(build.title)
  entry.iconTexture.SetTexture(buildIconFile(build.icon))
  return undefined
}

function showEquipSlot(slot: ArmoryEquipSlot, data: ArmoryBuildData): undefined {
  const [state, link] = data.GetEquipSlotItemLinkInfo(slot.equipType)
  const valid = state === ARMORY_BUILD_EQUIP_SLOT_STATE_VALID
  slot.icon.SetTexture(
    valid ? GetItemLinkIcon(link) : ZO_Character_GetEmptyEquipSlotTexture(slot.equipType)
  )
  const lacking =
    state === ARMORY_BUILD_EQUIP_SLOT_STATE_MISSING ||
    state === ARMORY_BUILD_EQUIP_SLOT_STATE_INACCESSIBLE
  const [red, green, blue, alpha] = (lacking ? ZO_ERROR_COLOR : ZO_WHITE).UnpackRGBA()
  slot.icon.SetColor(red, green, blue, alpha)
  return undefined
}

function labelled(format: number, value: string): string {
  return zo_strformat(format, ZO_SELECTED_TEXT.Colorize(value))
}

function showExpanded(
  entry: ArmoryExpandedEntry,
  build: ArmoryBuild,
  data: ArmoryBuildData
): undefined {
  showHeader(entry, build)
  entry.magickaAttribute.attributeValue.SetText(
    `${data.GetAttributeSpentPoints(ATTRIBUTE_MAGICKA)}`
  )
  entry.healthAttribute.attributeValue.SetText(`${data.GetAttributeSpentPoints(ATTRIBUTE_HEALTH)}`)
  entry.staminaAttribute.attributeValue.SetText(
    `${data.GetAttributeSpentPoints(ATTRIBUTE_STAMINA)}`
  )
  entry.championBar.AssignArmoryBuildData(data)
  entry.weaponSetRow1.AssignArmoryBuildData(data)
  entry.weaponSetRow2.AssignArmoryBuildData(data)
  entry.equipmentRow.buildData = data
  for (const slot of entry.equipmentSlots) showEquipSlot(slot, data)
  const mundus = build.target.mundus?.name ?? NO_MUNDUS
  entry.mundusLabel.SetText(labelled(SI_ARMORY_MUNDUS_STONE_LABEL, mundus))
  const curse = build.target.curseName
  const curseName = curse === "" ? GetString("SI_CURSETYPE", CURSE_TYPE_NONE) : curse
  entry.curseTypeLabel.SetText(labelled(SI_ARMORY_CURSE_TYPE_LABEL, curseName))
  const outfit = GetString(SI_NO_OUTFIT_EQUIP_ENTRY)
  entry.outfitNameLabel.SetText(labelled(SI_ARMORY_OUTFIT_LABEL, outfit))
  return undefined
}

export function addArmoryRows(list: Control, acts: ArmoryRowActs): undefined {
  const collapsed = (control: Control, row: ArmoryRow): undefined => {
    const build = row.build
    if (build === undefined) return undefined
    showHeader(control as ArmoryEntry, build)
    matchIconColumn(control.GetNamedChild("ContainerExpand"))
    return onClicked(control.GetNamedChild("Container"), () => acts.select(build.key))
  }
  const expanded = (control: Control, row: ArmoryRow): undefined => {
    const { build, data } = row
    if (build === undefined || data === undefined) return undefined
    showExpanded(control as ArmoryExpandedEntry, build, data)
    matchIconColumn(control.GetNamedChild("ContainerHeaderCollapse"))
    return onClicked(control.GetNamedChild("ContainerHeader"), () => acts.select(undefined))
  }
  const newBuild = (control: Control): undefined => {
    control.GetNamedChild<LabelControl>("ContainerUnlockText")?.SetText(NEW_BUILD_TEXT)
    matchIconColumn(control.GetNamedChild("ContainerUnlock"))
    return onClicked(control.GetNamedChild("Container"), () => acts.saveNew())
  }
  ZO_ScrollList_AddDataType<ArmoryRow>(
    list,
    COLLAPSED_ROW,
    "ZO_Armory_CollapsedBuildEntry",
    ZO_ARMORY_KEYBOARD_COLLAPSED_ENTRY_HEIGHT,
    collapsed
  )
  ZO_ScrollList_AddDataType<ArmoryRow>(
    list,
    EXPANDED_ROW,
    "ZO_Armory_ExpandedBuildEntry",
    ZO_ARMORY_KEYBOARD_EXPANDED_ENTRY_HEIGHT,
    expanded
  )
  ZO_ScrollList_AddDataType<ArmoryRow>(
    list,
    NEW_BUILD_ROW,
    "ZO_Armory_UnlockBuildEntry",
    ZO_ARMORY_KEYBOARD_UNLOCK_ENTRY_HEIGHT,
    newBuild
  )
  return undefined
}
