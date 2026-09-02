import {
  CRAFTED_ENCHANTMENTS,
  SORT_TYPE,
} from "../item-browser-constants/item-browser-constants.module.code.ts"
import { getData } from "../item-browser-data/item-browser-data.module.code.ts"
import type { RawItem } from "../item-browser-items/item-browser-items.module.code.ts"
import {
  countUnlockedSlots,
  getCurrencyCost,
} from "../item-browser-multi-account/item-browser-multi-account.module.code.ts"
import {
  checkFlag,
  getAllianceStyle,
  getColors,
  getMultiStyle,
  getVars,
  getZoneNameById,
} from "../item-browser-state/item-browser-state.module.code.ts"
import type { EntryData } from "../item-browser-types/item-browser-types.module.code.ts"

function makeItemLink(this: void, id: number, flags: number, ext?: number): string {
  const flagDefs = getData().flags
  let quality = 364
  let crafted = 0
  let health = 10000

  if (checkFlag(flags, flagDefs.crafted)) {
    quality = 370
    crafted = 1
  } else if (checkFlag(flags, flagDefs.jewelry)) {
    health = 0
  } else if (checkFlag(flags, flagDefs.weapon) && !checkFlag(flags, flagDefs.shield)) {
    health = 500
  }

  let style = 0
  if (checkFlag(flags, flagDefs.allianceStyle)) {
    style = getAllianceStyle()
  } else if (checkFlag(flags, flagDefs.multiStyle)) {
    style = getMultiStyle()
  } else if (checkFlag(flags, flagDefs.manualStyle)) {
    style = ext ?? 0
  }

  let itemLink = string.format(
    "|H1:item:%d:%d:50:0:0:0:0:0:0:0:0:0:0:0:0:%d:%d:0:0:%d:0|h|h",
    id,
    quality,
    style,
    crafted,
    health
  )

  if (crafted === 1) {
    const enchant = CRAFTED_ENCHANTMENTS[GetItemLinkArmorType(itemLink)] ?? 0
    const [enchanted] = string.gsub(
      itemLink,
      "370:50:0:0:0",
      string.format("370:50:%d:370:50", enchant)
    )
    itemLink = enchanted
  }

  return itemLink
}

function getSetBonuses(this: void, itemLink: string, numBonuses: number): string[] {
  const bonuses: string[] = []
  for (const i of $range(1, numBonuses)) {
    const [, bonusDescription] = GetItemLinkSetBonusInfo(itemLink, false, i)
    bonuses[i - 1] = bonusDescription
  }
  return bonuses
}

export function createEntryFromRaw(this: void, rawEntry: RawItem): EntryData | undefined {
  const id = rawEntry.id
  const flags = rawEntry.flags
  const data = getData()
  const flagDefs = data.flags
  const colors = getColors()
  const vars = getVars()

  const itemLink = makeItemLink(id, flags, rawEntry.ext)
  const zoneType: { [classification: number]: boolean | undefined } = {}

  const [, rawName, numBonuses, , , setId] = GetItemLinkSetInfo(itemLink, false)
  if (setId === 0) {
    return undefined
  }

  const name = zo_strformat(SI_ITEM_SET_NAME_FORMATTER, rawName)
  let subname = rawEntry.alt ?? ""

  let setFound: number
  let progress: number
  const setSize = GetNumItemSetCollectionPieces(setId)
  if (setSize > 0) {
    setFound = countUnlockedSlots(setId)
    if (vars.usePercentage) {
      progress = setFound / setSize
    } else {
      progress = 100 - (getCurrencyCost(setId, CURT_CHAOTIC_CREATIA) ?? 100)
    }
  } else {
    setFound = 0
    progress = vars.usePercentage ? 2 : 200
  }

  let itemType: string
  let color: ZoColorDef
  if (checkFlag(flags, flagDefs.crafted)) {
    itemType = string.format("%s (%d)", GetString(SI_ITEMBROWSER_TYPE_CRAFTED), rawEntry.ext ?? 0)
    color = colors.pink
    zoneType[0] = true
  } else if (checkFlag(flags, flagDefs.mythic)) {
    itemType = GetString("SI_ITEMDISPLAYQUALITY", ITEM_DISPLAY_QUALITY_MYTHIC_OVERRIDE)
    color = colors.mythic
  } else if (checkFlag(flags, flagDefs.jewelry)) {
    itemType = GetString("SI_GAMEPADITEMCATEGORY", GAMEPAD_ITEM_CATEGORY_JEWELRY)
    color = colors.violet
  } else if (checkFlag(flags, flagDefs.monster)) {
    itemType = GetString(SI_ITEMBROWSER_TYPE_MONSTER)
    color = colors.brown
  } else if (checkFlag(flags, flagDefs.weapon)) {
    subname = zo_strformat(SI_TOOLTIP_ITEM_NAME, GetItemLinkName(itemLink))
    itemType = zo_strformat("<<C:1>>", GetString("SI_ITEMTYPE", ITEMTYPE_WEAPON))
    color = colors.gold
  } else if (checkFlag(flags, flagDefs.mixedWeights)) {
    itemType = GetString("SI_DYEHUECATEGORY", DYE_HUE_CATEGORY_MIXED)
    color = colors.teal
  } else {
    const armorType = GetItemLinkArmorType(itemLink)
    const armorColors: { [armorType: number]: ZoColorDef | undefined } = {
      [ARMORTYPE_NONE]: ZO_DEFAULT_TEXT,
      [ARMORTYPE_HEAVY]: colors.health,
      [ARMORTYPE_LIGHT]: colors.magicka,
      [ARMORTYPE_MEDIUM]: colors.stamina,
    }
    itemType = zo_strformat("<<C:1>>", GetString("SI_ARMORTYPE", armorType))
    color = armorColors[armorType] ?? ZO_DEFAULT_TEXT
  }

  const sources: string[] = []
  const zoneIds: { [zoneId: number]: boolean | undefined } = {}
  for (const source of rawEntry.sources) {
    if (typeof source === "number") {
      sources.push(getZoneNameById(source))
      zoneIds[source] = true
      const classification = data.zoneClassification[source]
      if (classification !== undefined) {
        zoneType[classification] = true
      }
    } else {
      const subSources: string[] = []
      for (const subSource of source) {
        subSources.push(getZoneNameById(subSource))
      }
      const lastIndex = sources.length - 1
      sources[lastIndex] = string.format(
        "%s (%s)",
        sources[lastIndex],
        table.concat(subSources, ", ")
      )
    }
  }

  zoneType[GetItemLinkBindType(itemLink) === BIND_TYPE_ON_EQUIP ? 7 : 8] = true

  return {
    type: SORT_TYPE,
    name,
    subname,
    itemType,
    source: table.concat(sources, ", "),
    zoneIds,
    zoneType,
    color,
    bonuses: numBonuses,
    itemLink,
    setId,
    setSize,
    setFound,
    progress,
  }
}

export { getSetBonuses }
