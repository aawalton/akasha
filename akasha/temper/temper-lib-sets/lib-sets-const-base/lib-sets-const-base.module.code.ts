import { boolPair } from "../lib-sets-bool-pair/lib-sets-bool-pair.module.code.ts"
import { asGlobalTable, asTyped } from "../lib-sets-casts/lib-sets-casts.module.code.ts"

const MAJOR = "LibSets"
const MINOR = 0.92

const G = asGlobalTable(globalThis)

function isLibSetsAlreadyLoaded(this: void, outputMsg?: boolean): boolean {
  const doOutput = outputMsg ?? false
  if (LibSets !== undefined && LibSets.fullyLoaded === true) {
    const loadedVersion = LibSets.version
    if (loadedVersion < MINOR) {
      return false
    }
    if (doOutput === true) {
      d(
        "[" +
          MAJOR +
          "]Library was already loaded before, with version " +
          tostring(loadedVersion) +
          "!"
      )
    }
    return true
  }
  return false
}
G["IsLibSetsAlreadyLoaded"] = isLibSetsAlreadyLoaded

LibSets = asTyped<LibSetsApi>({})
const lib = LibSets

const IsConsole = ZO_IsConsoleOrGameCoreUI()
lib.IsConsole = IsConsole
lib.SearchUI = {
  name: MAJOR + "_SearchUI",
  controlName: boolPair("LibSets_SearchUI_TLC_Keyboard", "LibSets_SearchUI_TLC_Gamepad"),
  control: new LuaMap<boolean, unknown>(),
  KeyboardVars: {
    minWidth: 934,
    minHeight: 600,
  },
}

lib.name = MAJOR
const libPrefix = "[" + MAJOR + "]"
lib.prefix = libPrefix
lib.version = MINOR
lib.author = "Baertram"
lib.svName = "LibSets_SV_Data"
lib.svDebugName = "LibSets_SV_DEBUG_Data"
lib.svVersion = 0.38
lib.setsLoaded = false
lib.setsScanning = false
lib.fullyLoaded = false
lib.startedLoading = true
lib.setIds = {}
lib.nonExistingSetIdsAtCurrentApiVersion = {}

lib.customTooltipHooks = {
  needed: {},
  hooked: {},
  eventPlayerActivatedCalled: false,
}
lib.customContextMenuEntries = {
  setSearchUI: {},
}

const API_VERSIONS: { [key: string]: number } = {}
lib.lastSetsPreloadedCheckAPIVersion = 101049

API_VERSIONS["PTS"] = 101050
const APIVersionPTS = tonumber(API_VERSIONS["PTS"]) ?? 0

API_VERSIONS["live"] = GetAPIVersion()
const APIVersionLive = tonumber(API_VERSIONS["live"]) ?? 0

function checkIfPTSAPIVersionIsLive(this: void): boolean {
  return APIVersionLive >= APIVersionPTS || false
}
lib.checkIfPTSAPIVersionIsLive = checkIfPTSAPIVersionIsLive
lib.APIVersions = API_VERSIONS

lib.debugNumItemIdPackages = 60
lib.debugNumItemIdPackageSize = 5000
lib.debugMaxCollectibleIds = 250000

const LANG_DE = "de"
const LANG_EN = "en"
const LANG_ES = "es"
const LANG_FR = "fr"
const LANG_RU = "ru"
const LANG_ZH = "zh"
const LANG_JP = "jp"
const LANG_PL = "pl"

const fallbackLang = LANG_EN
lib.fallbackLang = fallbackLang

const SUPPORTED_LANGUAGES: { [lang: string]: boolean } = {
  [LANG_DE]: true,
  [LANG_EN]: true,
  [LANG_ES]: true,
  [LANG_FR]: true,
  [LANG_PL]: true,
  [LANG_RU]: true,
  [LANG_ZH]: true,
  [LANG_JP]: false,
}
lib.supportedLanguages = SUPPORTED_LANGUAGES

const NON_OFFICIAL_LANGUAGES: { [lang: string]: boolean } = {
  [LANG_PL]: true,
  [LANG_JP]: true,
}
lib.nonOfficialLanguages = NON_OFFICIAL_LANGUAGES

let NUM_SUPPORTED_LANGS = 0
let NUM_SUPPORTED_LANGS_FOR_DEBUG = 0
const SUPPORTED_LANGUAGES_INDEX: string[] = []
for (const [supportedLanguage, isSupported] of pairs(SUPPORTED_LANGUAGES)) {
  if (isSupported === true) {
    NUM_SUPPORTED_LANGS = NUM_SUPPORTED_LANGS + 1
    NUM_SUPPORTED_LANGS_FOR_DEBUG = NUM_SUPPORTED_LANGS_FOR_DEBUG + 1
    SUPPORTED_LANGUAGES_INDEX[SUPPORTED_LANGUAGES_INDEX.length] = tostring(supportedLanguage)
  } else {
    if (NON_OFFICIAL_LANGUAGES[supportedLanguage] === true) {
      NUM_SUPPORTED_LANGS_FOR_DEBUG = NUM_SUPPORTED_LANGS_FOR_DEBUG + 1
    }
  }
}
lib.numSupportedLangs = NUM_SUPPORTED_LANGS
lib.numSupportedLangsForDebug = NUM_SUPPORTED_LANGS_FOR_DEBUG
table.sort(SUPPORTED_LANGUAGES_INDEX)
lib.supportedLanguagesIndex = SUPPORTED_LANGUAGES_INDEX

const SUPPORTED_LANGUAGE_CHOICES: string[] = [
  LANG_DE,
  LANG_EN,
  LANG_ES,
  LANG_FR,
  LANG_RU,
  LANG_ZH,
  LANG_PL,
]
const SUPPORTED_LANGUAGE_CHOICES_VALUES: number[] = []
for (let langId = 1; langId <= SUPPORTED_LANGUAGE_CHOICES.length; langId++) {
  SUPPORTED_LANGUAGE_CHOICES_VALUES[langId - 1] = langId
}
lib.supportedLanguageChoices = SUPPORTED_LANGUAGE_CHOICES
lib.supportedLanguageChoicesValues = SUPPORTED_LANGUAGE_CHOICES_VALUES

let clientLang = GetCVar("language.2")
clientLang = string.lower(clientLang)
if (SUPPORTED_LANGUAGES[clientLang] !== true) {
  clientLang = fallbackLang
}
lib.clientLang = clientLang

const NO_SET_ID_STRING = "NoSetId"
G["LIBSETS_TABLEKEY_NEWSETIDS"] = "NewSetIDs"
G["LIBSETS_TABLEKEY_NAMES"] = "Names"
G["LIBSETS_TABLEKEY_SETITEMIDS"] = "setItemIds"
G["LIBSETS_TABLEKEY_SETITEMIDS_NO_SETID"] = LIBSETS_TABLEKEY_SETITEMIDS + NO_SET_ID_STRING
G["LIBSETS_TABLEKEY_SETITEMIDS_COMPRESSED"] = LIBSETS_TABLEKEY_SETITEMIDS + "_Compressed"
G["LIBSETS_TABLEKEY_SETS_EQUIP_TYPES"] = "setsEquipTypes"
G["LIBSETS_TABLEKEY_SETS_ARMOR_TYPES"] = "setsArmorTypes"
G["LIBSETS_TABLEKEY_SETS_JEWELRY"] = "setsWithJewelry"
G["LIBSETS_TABLEKEY_SETS_WEAPONS_TYPES"] = "setsWeaponTypes"
G["LIBSETS_TABLEKEY_SETNAMES"] = "set" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_SETNAMES_NO_SETID"] = "set" + LIBSETS_TABLEKEY_NAMES + NO_SET_ID_STRING
G["LIBSETS_TABLEKEY_LASTCHECKEDAPIVERSION"] = "lastSetsCheckAPIVersion"
G["LIBSETS_TABLEKEY_NUMBONUSES"] = "numBonuses"
G["LIBSETS_TABLEKEY_MAXEQUIPPED"] = "maxEquipped"
G["LIBSETS_TABLEKEY_SETTYPE"] = "setType"
G["LIBSETS_TABLEKEY_MAPS"] = "maps"
G["LIBSETS_TABLEKEY_WAYSHRINES"] = "wayshrines"
G["LIBSETS_TABLEKEY_WAYSHRINE_NAMES"] = "wayshrine" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_ZONEIDS"] = "zoneIds"
G["LIBSETS_TABLEKEY_ZONEIDS_SORTED"] = "zoneIdsSorted"
G["LIBSETS_TABLEKEY_ZONE_DATA"] = "zoneData"
G["LIBSETS_TABLEKEY_DUNGEONFINDER_DATA"] = "dungeonFinderData"
G["LIBSETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES"] = "achievementCategory" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_COLLECTIBLE_DLC_NAMES"] = "collectible_DLC" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_COLLECTIBLE_NAMES"] = "collectible" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_WAYSHRINENODEID2ZONEID"] = "wayshrineNodeId2zoneId"
G["LIBSETS_TABLEKEY_DROPMECHANIC"] = "dropMechanic"
G["LIBSETS_TABLEKEY_DROPMECHANIC_SORTED"] = "dropMechanicSorted"
G["LIBSETS_TABLEKEY_DROPMECHANIC_NAMES"] = LIBSETS_TABLEKEY_DROPMECHANIC + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_DROPMECHANIC_TOOLTIP_NAMES"] =
  LIBSETS_TABLEKEY_DROPMECHANIC + "Tooltip" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES"] =
  LIBSETS_TABLEKEY_DROPMECHANIC + "DropLocation" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_MIXED_SETNAMES"] = "MixedSetNamesForDataAll"
G["LIBSETS_TABLEKEY_SET_PROCS_ALLOWED_IN_PVP"] = "setProcsAllowedInPvP"
G["LIBSETS_TABLEKEY_SET_ITEM_COLLECTIONS_ZONE_MAPPING"] = "setItemCollectionsZoneMapping"
G["LIBSETS_TABLEKEY_ENCHANT_SEARCHCATEGORY_TYPES"] = "enchantSearchCategories"
G["LIBSETS_TABLEKEY_DUNGEON_ZONE_MAPPING"] = "dungeonZoneMapping"
G["LIBSETS_TABLEKEY_PUBLICDUNGEON_ZONE_MAPPING"] = "publicDungeonZoneMapping"
G["LIBSETS_TABLEKEY_TABLENAME"] = "tableName"

G["LIBSETS_SET_ITEMID_TABLE_VALUE_OK"] = 1
G["LIBSETS_SET_ITEMID_TABLE_VALUE_NOTOK"] = 2

G["LIBSETS_SET_COLLECTIONS_CATEGORY_TOPMOST_NODE"] = -1

G["LIBSETS_SETPROC_CHECKTYPE_ABILITY_EVENT_EFFECT_CHANGED"] = 1
G["LIBSETS_SETPROC_CHECKTYPE_ABILITY_EVENT_COMBAT_EVENT"] = 2
G["LIBSETS_SETPROC_CHECKTYPE_EVENT_POWER_UPDATE"] = 4
G["LIBSETS_SETPROC_CHECKTYPE_EVENT_BOSSES_CHANGED"] = 5
G["LIBSETS_SETPROC_CHECKTYPE_SPECIAL"] = 99
