import { DEFAULTS } from "../destinations-defaults/destinations-defaults.module.code.ts"
import { MAP_STATE } from "../destinations-pins-map-context/destinations-pins-map-context.module.code.ts"
import { DRTV } from "../destinations-runtime-variables/destinations-runtime-variables.module.code.ts"
import {
  getCharacterSavedVariables,
  getSavedVariables,
} from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

interface PartialPinEntry {
  maxDistance?: number
  level?: number
  tint?: number[]
  textcolor?: number[]
  textcolortitle?: number[]
  textcolorBait?: number[]
  textcolorWater?: number[]
  type?: number
  size?: number
}

type PartialPinsTable = Record<string, PartialPinEntry | undefined>

function asPartialPinsTable(pins: object): PartialPinsTable {
  return pins as PartialPinsTable
}

type PartialSettingsTable = Record<string, boolean | undefined>

function asPartialSettingsTable(settings: object): PartialSettingsTable {
  return settings as PartialSettingsTable
}

function backfillBaseFields(
  pins: PartialPinsTable,
  defaultPins: PartialPinsTable,
  pinName: string,
  sourceName: string
): undefined {
  const entry = pins[pinName]
  if (entry === undefined) return
  const liveSource = pins[sourceName]
  const source =
    liveSource !== undefined && liveSource.maxDistance != null
      ? liveSource
      : defaultPins[sourceName]
  if (source !== undefined) {
    if (entry.maxDistance == null) entry.maxDistance = source.maxDistance
    if (entry.level == null) entry.level = source.level
    if (entry.tint == null) entry.tint = source.tint
    if (entry.textcolor == null) entry.textcolor = source.textcolor
  }
  const defaultEntry = defaultPins[pinName]
  if (defaultEntry !== undefined) {
    if (entry.type == null) entry.type = defaultEntry.type
    if (entry.size == null) entry.size = defaultEntry.size
  }
}

const FIELD_NAMES = [
  "maxDistance",
  "type",
  "level",
  "size",
  "tint",
  "textcolor",
] satisfies (keyof PartialPinEntry)[]

function copyMissingField<K extends keyof PartialPinEntry>(
  entry: PartialPinEntry,
  defaultEntry: PartialPinEntry,
  field: K
): undefined {
  if (entry[field] == null) {
    entry[field] = defaultEntry[field]
  }
}

function backfillFromDefaults(
  pins: PartialPinsTable,
  defaultPins: PartialPinsTable,
  pinName: string,
  extraFields: (keyof PartialPinEntry)[]
): undefined {
  const entry = pins[pinName]
  const defaultEntry = defaultPins[pinName]
  if (entry === undefined || defaultEntry === undefined) return
  for (const field of FIELD_NAMES) {
    copyMissingField(entry, defaultEntry, field)
  }
  for (const field of extraFields) {
    copyMissingField(entry, defaultEntry, field)
  }
}

export function initVariables(): undefined {
  const sv = getSavedVariables()
  const cssv = getCharacterSavedVariables()

  MAP_STATE.playerAlliance = GetUnitAlliance("player")
  cssv.settings.activateReloaduiButton = false

  const pins = asPartialPinsTable(sv.pins)
  const defaultPins = asPartialPinsTable(DEFAULTS.pins)

  for (const pinName of DRTV.AchPinTex) {
    backfillBaseFields(pins, defaultPins, pinName, "pinTextureOther")
    backfillBaseFields(pins, defaultPins, pinName + "Done", "pinTextureOtherDone")
  }

  backfillFromDefaults(pins, defaultPins, "pinTextureAyleid", [])
  backfillFromDefaults(pins, defaultPins, "pinTextureDwemer", [])
  backfillFromDefaults(pins, defaultPins, "pinTextureWWVamp", [])
  backfillFromDefaults(pins, defaultPins, "pinTextureWWShrine", [])
  backfillFromDefaults(pins, defaultPins, "pinTextureVampAltar", [])
  backfillFromDefaults(pins, defaultPins, "pinTextureCollectible", ["textcolortitle"])
  backfillFromDefaults(pins, defaultPins, "pinTextureCollectibleDone", ["textcolortitle"])
  backfillFromDefaults(pins, defaultPins, "pinTextureFish", [
    "textcolortitle",
    "textcolorBait",
    "textcolorWater",
  ])
  backfillFromDefaults(pins, defaultPins, "pinTextureFishDone", [
    "textcolortitle",
    "textcolorBait",
    "textcolorWater",
  ])

  const settings = asPartialSettingsTable(sv.settings)
  if (settings["ShowDungeonBossesInZones"] == null) {
    settings["ShowDungeonBossesInZones"] = DEFAULTS.settings.ShowDungeonBossesInZones
  }
  if (settings["ShowDungeonBossesOnTop"] == null) {
    settings["ShowDungeonBossesOnTop"] = DEFAULTS.settings.ShowDungeonBossesOnTop
  }
  if (settings["ShowCadwellsAlmanac"] == null) {
    settings["ShowCadwellsAlmanac"] = DEFAULTS.settings.ShowCadwellsAlmanac
  }
  if (settings["ShowCadwellsAlmanacOnly"] == null) {
    settings["ShowCadwellsAlmanacOnly"] = DEFAULTS.settings.ShowCadwellsAlmanacOnly
  }
}
