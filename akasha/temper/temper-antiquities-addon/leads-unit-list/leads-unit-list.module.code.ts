import { requireNumericKey } from "@akasha/temper-narrow/require-numeric-key"
import {
  DROPDOWN_DATA,
  DROPDOWN_MAJOR_ACTIONABLE,
  DROPDOWN_MAJOR_ALL,
  DROPDOWN_MAJOR_CANFIND,
  DROPDOWN_MAJOR_CANSCRY,
  DROPDOWN_MAJOR_GROUPDUNGEONS,
  DROPDOWN_MAJOR_LATESTDLC,
  DROPDOWN_MAJOR_MISSINGCODEX,
  DROPDOWN_MAJOR_NEVERDUGOUT,
  DROPDOWN_SETTYPE_ALL,
  DROPDOWN_SETTYPE_MULTIPART,
  DROPDOWN_SETTYPE_NOOBVIOUS,
  DROPDOWN_ZONE_ALL,
  DROPDOWN_ZONE_CURRENT,
  DROPDOWN_ZONE_LATESTDLC,
  DROPDOWN_ZONE_NODLC,
  FURNISHING,
  IS_SET,
  MOTIF_CHAPTER,
  TREASURE,
} from "../leads-constants/leads-constants.module.code.ts"
import { GROUP_DUNGEON_ANTIQUITY_IDS } from "../leads-group-dungeons/leads-group-dungeons.module.code.ts"
import { getDropdownChoice } from "../leads-saved-variables/leads-saved-variables.module.code.ts"
import {
  colorizeExpiration,
  getColorCode,
} from "../leads-unit-colors/leads-unit-colors.module.code.ts"
import type { UnitList, UnitListClass } from "../leads-unit-shapes/leads-unit-shapes.module.code.ts"
import {
  getUnits,
  isFinishedNonRepeatable,
  isOverCollectedSet,
} from "../leads-unit-state/leads-unit-state.module.code.ts"
import {
  FAKE_ZONE_IDS,
  LATEST_DLC_FIRST_ANTIQUITY_ID,
  ZONE_IDS,
  ZONE_TYPE_CHAPTER,
  ZONE_TYPES,
} from "../leads-zones/leads-zones.module.code.ts"

const leadsUnitList = ZO_SortFilterList.Subclass<UnitListClass>()
leadsUnitList.defaults = {}
leadsUnitList.SORT_KEYS = {
  Lead: {},
  Zone: { tiebreaker: "Lead" },
  Location: { tiebreaker: "Lead" },
  Diff: { tiebreaker: "Lead" },
  Lore: { tiebreaker: "Lead" },
  Dug: { tiebreaker: "Lead" },
  Set: { tiebreaker: "Lead" },
  Expiration: { tiebreaker: "Lead" },
}

function getScrollData(list: Control): ZoScrollListDataEntry<LeadsUnitData>[] {
  const scrollData = ZO_ScrollList_GetDataList<LeadsUnitData>(list)
  if (scrollData === undefined) {
    throw new Error("TemperLeads scroll data list missing")
  }
  return scrollData
}

function getRowLabel(control: LeadsRowControl, suffix: string): LeadsRowLabel {
  const label = GetControl<LeadsRowLabel>(control, suffix)
  if (label === undefined) {
    throw new Error(string.format("TemperLeads row label missing: %s", suffix))
  }
  return label
}

function formatExpiration(leadTimeLeft: number): string {
  const days = math.floor(leadTimeLeft / 86400)
  const hours = math.floor((leadTimeLeft - days * 86400) / 3600)
  const minutes = math.floor((leadTimeLeft - days * 86400 - hours * 3600) / 60)
  return string.format("%dd %dh %dm", days, hours, minutes)
}

leadsUnitList.New = function (this: UnitListClass): UnitList {
  return ZO_SortFilterList.New<UnitList>(this, TemperLeadsMainWindow)
}

leadsUnitList.Initialize = function (this: UnitList, control: Control) {
  ZO_SortFilterList.Initialize(this, control)
  this.sortHeaderGroup.SelectHeaderByKey("Lead")
  this.masterList = []
  ZO_ScrollList_AddDataType<LeadsUnitData, LeadsRowControl>(
    this.list,
    1,
    "TemperLeadsUnitRow",
    30,
    (rowControl, data) => {
      this.SetupUnitRow(rowControl, data)
    }
  )
  ZO_ScrollList_EnableHighlight(this.list, "ZO_ThinListHighlight")
  this.sortFunction = (listEntry1, listEntry2) =>
    ZO_TableOrderingFunction(
      listEntry1.data,
      listEntry2.data,
      this.currentSortKey,
      leadsUnitList.SORT_KEYS,
      this.currentSortOrder
    )
  this.RefreshData()
}

leadsUnitList.BuildMasterList = function (this: UnitList) {
  this.masterList = []
  for (const [key, data] of Object.entries(getUnits())) {
    data.Aid = requireNumericKey(key, "units key")
    this.masterList.push(data)
  }
}

leadsUnitList.FilterScrollList = function (this: UnitList) {
  const choiceMajor = getDropdownChoice()["Major"]
  const choiceZone = getDropdownChoice()["Zone"]
  const choiceSetType = getDropdownChoice()["SetType"]

  const passesMajor = (data: LeadsUnitData): boolean => {
    const choices = DROPDOWN_DATA.ChoicesMajor
    if (choiceMajor === choices[DROPDOWN_MAJOR_ALL]) {
      return true
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_ACTIONABLE]) {
      return !(isFinishedNonRepeatable(data) || isOverCollectedSet(data))
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_CANSCRY]) {
      return data.HaveLead
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_CANFIND]) {
      return !data.HaveLead && !isFinishedNonRepeatable(data) && !isOverCollectedSet(data)
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_MISSINGCODEX]) {
      return data.Lore > 0
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_NEVERDUGOUT]) {
      return data.Dug === 0
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_GROUPDUNGEONS]) {
      return GROUP_DUNGEON_ANTIQUITY_IDS[data.Aid] !== undefined
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_LATESTDLC]) {
      return data.Aid >= LATEST_DLC_FIRST_ANTIQUITY_ID && !isFinishedNonRepeatable(data)
    }
    return false
  }

  const fmtZone = (zoneId: number): string => ZO_CachedStrFormat("<<C:1>>", GetZoneNameById(zoneId))

  const passesZone = (data: LeadsUnitData): boolean => {
    const currentZoneIndex = GetCurrentMapZoneIndex()
    let currentZoneId = GetZoneId(currentZoneIndex)
    while (
      !(currentZoneId === ZONE_IDS.ARTAEUM || GetParentZoneId(currentZoneId) === currentZoneId)
    ) {
      currentZoneId = GetParentZoneId(currentZoneId)
    }
    if (currentZoneId === ZONE_IDS.WSKYRIMCAVERN) {
      currentZoneId = ZONE_IDS.WSKYRIM
    }
    if (currentZoneId === ZONE_IDS.THEREACHCAVERN) {
      currentZoneId = ZONE_IDS.THEREACH
    }

    const choices = DROPDOWN_DATA.ChoicesZone
    if (choiceZone === choices[DROPDOWN_ZONE_ALL]) {
      return true
    }
    if (choiceZone === choices[DROPDOWN_ZONE_CURRENT]) {
      if (data.ZoneId < FAKE_ZONE_IDS.ALLZONES) {
        return data.ZoneId === currentZoneId
      }
      if (data.ZoneId === FAKE_ZONE_IDS.ALLZONES || data.ZoneId === FAKE_ZONE_IDS.UNKNOWN) {
        return true
      }
      if (data.ZoneId === FAKE_ZONE_IDS.BGS) {
        return false
      }
      if (data.ZoneId === FAKE_ZONE_IDS.ARTAEUM_SUMMERSET) {
        return currentZoneId === ZONE_IDS.ARTAEUM || currentZoneId === ZONE_IDS.SUMMERSET
      }
      if (data.ZoneId === FAKE_ZONE_IDS.EASTMARCH_RIFT) {
        return currentZoneId === ZONE_IDS.EASTMARCH || currentZoneId === ZONE_IDS.RIFT
      }
      if (data.ZoneId === FAKE_ZONE_IDS.CYRODIIL_IMPERIALCITY) {
        return currentZoneId === ZONE_IDS.CYRODIIL || currentZoneId === ZONE_IDS.IMPERIALCITY
      }
      if (data.ZoneId === FAKE_ZONE_IDS.GALEN_HIGHISLE) {
        return choiceZone === fmtZone(ZONE_IDS.GALEN) || choiceZone === fmtZone(ZONE_IDS.HIGHISLE)
      }
      return false
    }
    if (choiceZone === choices[DROPDOWN_ZONE_NODLC]) {
      const test = ZONE_TYPES[data.ZoneId]
      return (
        test === undefined || test === ZONE_TYPE_CHAPTER || data.ZoneId >= FAKE_ZONE_IDS.ALLZONES
      )
    }
    if (choiceZone === choices[DROPDOWN_ZONE_LATESTDLC]) {
      return data.Aid >= LATEST_DLC_FIRST_ANTIQUITY_ID && !isFinishedNonRepeatable(data)
    }
    if (data.ZoneId < FAKE_ZONE_IDS.ALLZONES) {
      return data.Zone === choiceZone
    }
    if (data.ZoneId === FAKE_ZONE_IDS.ALLZONES || data.ZoneId === FAKE_ZONE_IDS.UNKNOWN) {
      return true
    }
    if (data.ZoneId === FAKE_ZONE_IDS.BGS) {
      return false
    }
    if (data.ZoneId === FAKE_ZONE_IDS.ARTAEUM_SUMMERSET) {
      return choiceZone === fmtZone(ZONE_IDS.ARTAEUM) || choiceZone === fmtZone(ZONE_IDS.SUMMERSET)
    }
    if (data.ZoneId === FAKE_ZONE_IDS.EASTMARCH_RIFT) {
      return choiceZone === fmtZone(ZONE_IDS.EASTMARCH) || choiceZone === fmtZone(ZONE_IDS.RIFT)
    }
    if (data.ZoneId === FAKE_ZONE_IDS.CYRODIIL_IMPERIALCITY) {
      return (
        choiceZone === fmtZone(ZONE_IDS.CYRODIIL) || choiceZone === fmtZone(ZONE_IDS.IMPERIALCITY)
      )
    }
    if (data.ZoneId === FAKE_ZONE_IDS.GALEN_HIGHISLE) {
      return choiceZone === fmtZone(ZONE_IDS.GALEN) || choiceZone === fmtZone(ZONE_IDS.HIGHISLE)
    }
    return false
  }

  const passesSetType = (data: LeadsUnitData): boolean => {
    const choices = DROPDOWN_DATA.ChoicesSetType
    if (choiceSetType === choices[DROPDOWN_SETTYPE_ALL]) {
      return true
    }
    if (choiceSetType === choices[DROPDOWN_SETTYPE_MULTIPART]) {
      return IS_SET[data.Set] === undefined
    }
    if (choiceSetType === choices[DROPDOWN_SETTYPE_NOOBVIOUS]) {
      if (choiceMajor === DROPDOWN_DATA.ChoicesMajor[DROPDOWN_MAJOR_CANSCRY]) {
        return !(data.Diff === 1 && data.Set === TREASURE)
      }
      return !(
        data.Set === MOTIF_CHAPTER ||
        (data.Diff < 4 && data.Set === TREASURE) ||
        (data.Diff < 2 && data.Set === FURNISHING)
      )
    }
    return data.Set === choiceSetType
  }

  const scrollData = getScrollData(this.list)
  ZO_ClearNumericallyIndexedTable(scrollData)
  for (const data of this.masterList) {
    if (passesMajor(data) && passesZone(data) && passesSetType(data)) {
      scrollData.push(ZO_ScrollList_CreateDataEntry(1, data))
    }
  }
}

leadsUnitList.SortScrollList = function (this: UnitList) {
  const scrollData = getScrollData(this.list)
  table.sort(scrollData, this.sortFunction)
}

leadsUnitList.SetupUnitRow = function (
  this: UnitList,
  control: LeadsRowControl,
  data: LeadsUnitData
) {
  control.data = data
  const lead = getRowLabel(control, "Lead")
  const zone = getRowLabel(control, "Zone")
  const location = getRowLabel(control, "Location")
  const diff = getRowLabel(control, "Diff")
  const lore = getRowLabel(control, "Lore")
  const dug = getRowLabel(control, "Dug")
  const set = getRowLabel(control, "Set")
  const expiration = getRowLabel(control, "Expiration")
  control.Lead = lead
  control.Zone = zone
  control.Location = location
  control.Diff = diff
  control.Lore = lore
  control.Dug = dug
  control.Set = set
  control.Expiration = expiration

  let formatBegin = ""
  let formatEnd = ""
  if (isFinishedNonRepeatable(data) || isOverCollectedSet(data)) {
    formatBegin = "|l0:1:0:-25%:2:000000|l"
    formatEnd = "|l"
  }
  lead.SetText(formatBegin + data.Lead + formatEnd)
  zone.SetText(formatBegin + data.Zone + formatEnd)
  location.SetText(formatBegin + data.Location + formatEnd)
  diff.SetText(tostring(data.Diff))
  lore.SetText(tostring(data.Lore))
  dug.SetText(tostring(data.Dug))
  set.SetText(formatBegin + data.Set + formatEnd)
  if (data.HaveLead) {
    expiration.SetText(formatExpiration(data.Expiration))
  } else {
    expiration.SetText("")
  }

  lead.normalColor = getColorCode(data.Diff)
  zone.normalColor = getColorCode(data.Diff)
  location.normalColor = getColorCode(data.Diff)
  diff.normalColor = getColorCode(data.Diff)
  lore.normalColor = getColorCode(data.Diff)
  dug.normalColor = getColorCode(data.Diff)
  set.normalColor = getColorCode(data.SetQuality)
  expiration.normalColor = colorizeExpiration(data.Expiration)

  ZO_SortFilterList.SetupRow(this, control, data)
}

leadsUnitList.Refresh = function (this: UnitList) {
  this.RefreshData()
}

let unitListInstance: UnitList | undefined

export function createUnitList(): UnitList {
  unitListInstance = leadsUnitList.New()
  return unitListInstance
}

export function getUnitList(): UnitList {
  if (unitListInstance === undefined) {
    throw new Error("TemperLeads unit list not initialized")
  }
  return unitListInstance
}
