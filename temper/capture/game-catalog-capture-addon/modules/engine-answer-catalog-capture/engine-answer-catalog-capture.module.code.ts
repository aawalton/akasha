import type { EngineAnswer } from "akasha/temper/capture/shape/modules/engine-answer-catalog/engine-answer-catalog.module.code.ts"
import { registerCatalogDomain } from "akasha/temper/catalog/core/modules/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

const ASKED: readonly string[] = [
  "AreUserAddOnsSupported",
  "DoesCurrentLanguageRequireIME",
  "DoesPlatformAllowConfiguringAutomaticInputChanging",
  "DoesPlatformSupportCodeRedemption",
  "DoesPlatformSupportSpatialSound",
  "DoesPlatformSupportSpatialSoundQuality",
  "GetAssignableAbilityBarStartAndEndSlots",
  "GetAssignableChampionBarStartAndEndSlots",
  "GetDigitGroupingSize",
  "GetGamepadLeftStickSlideAndScrollIcon",
  "GetGamepadLeftStickSlideIcon",
  "GetGamepadRightStickScrollIcon",
  "GetHeraldryCustomizationCosts",
  "GetHighestItemStyleId",
  "GetHousingEditorConstants",
  "GetInfamyMeterSize",
  "GetJewelrycraftingCollectibleId",
  "GetKeyboardLayout",
  "GetMaxBindingsPerAction",
  "GetMaxKioskBidsPerGuild",
  "GetMaxLevel",
  "GetMaxNumSavedKeybindings",
  "GetMaxRecipeIngredients",
  "GetMaxSpendableChampionPointsInAttribute",
  "GetMinLevelForCampaignTutorial",
  "GetMinMaxRamEscorts",
  "GetNumAdvancedStatCategories",
  "GetNumChampionDisciplines",
  "GetNumClasses",
  "GetNumCollectibleCategories",
  "GetNumDyes",
  "GetNumGuildRankIcons",
  "GetNumHeraldryBackgroundCategories",
  "GetNumHeraldryColors",
  "GetNumHeraldryCrestCategories",
  "GetNumMaps",
  "GetNumPlayerStatuses",
  "GetNumUpgradesPerStablemasterTraining",
  "GetOutfitChangeFlatCost",
  "GetPlatformServiceType",
  "GetSkyshardDiscoveryDistanceM",
  "GetTradingHouseCutPercentage",
  "GetTradingHouseListingPercentage",
  "GetUIPlatform",
  "GetUniversalStyleId",
  "GetWeaponSwapUnlockedLevel",
  "IsChatSystemAvailableForCurrentPlatform",
  "IsConsoleUI",
  "IsGameCoreUI",
  "IsGamepadUISupported",
  "IsInternalBuild",
  "IsJusticeEnabled",
  "IsKeyboardUISupported",
  "IsMacUI",
  "IsSubmitFeedbackSupported",
  "IsTamrielTomesEnabled",
  "VoiceChatGetNumberMutedPlayers",
]

interface AskedGiven {
  readonly name: string
  readonly given: readonly (readonly string[])[]
}

const USER_TYPES: readonly (readonly string[])[] = [
  ["GROUP_FINDER_GROUP_LISTING_USER_TYPE_GROUP_LISTING_DRAFT"],
  ["GROUP_FINDER_GROUP_LISTING_USER_TYPE_CREATED_GROUP_LISTING"],
  ["GROUP_FINDER_GROUP_LISTING_USER_TYPE_APPLIED_TO_GROUP_LISTING"],
]

const ASKED_GIVEN: readonly AskedGiven[] = [
  { name: "GetGroupFinderUserTypeGroupSizeIterationBegin", given: USER_TYPES },
  { name: "GetGroupFinderUserTypeGroupSizeIterationEnd", given: USER_TYPES },
  { name: "GetSetting", given: [["SETTING_TYPE_GRAPHICS", "GRAPHICS_SETTING_ACTIVE_DISPLAY"]] },
]

const NOTHING = 0

function writable(this: void, held: unknown): held is EngineAnswer {
  if (typeof held === "number") return held * NOTHING === NOTHING
  return typeof held === "string" || typeof held === "boolean"
}

function answersOf(
  this: void,
  name: string,
  handed: readonly number[] = []
): EngineAnswer[] | undefined {
  const held: unknown = _G[name]
  if (typeof held !== "function") return undefined
  const asked = held as (this: void, ...handed: number[]) => LuaMultiReturn<unknown[]>
  const [ok, packed] = pcall((): unknown[] => [...asked(...handed)])
  if (!ok) return undefined
  const kept: EngineAnswer[] = []
  for (const one of packed) {
    if (!writable(one)) return kept
    kept[kept.length] = one
  }
  return kept
}

function valuesOf(this: void, named: readonly string[]): number[] | undefined {
  const found: number[] = []
  for (const name of named) {
    const held: unknown = _G[name]
    if (typeof held !== "number") return undefined
    found[found.length] = held
  }
  return found
}

function collectEngineAnswerCatalog(this: void, onComplete: (this: void) => void): undefined {
  const answers: Record<string, EngineAnswer[]> = {}
  for (const name of ASKED) {
    const got = answersOf(name)
    if (got !== undefined) answers[name] = got
  }
  const answersGiven: Record<string, Record<string, EngineAnswer[]>> = {}
  for (const one of ASKED_GIVEN) {
    const byGiven: Record<string, EngineAnswer[]> = {}
    for (const named of one.given) {
      const handed = valuesOf(named)
      if (handed === undefined) continue
      const got = answersOf(one.name, handed)
      if (got !== undefined) byGiven[handed.join(",")] = got
    }
    answersGiven[one.name] = byGiven
  }
  getSavedVariables().engineAnswerCatalog = { apiVersion: GetAPIVersion(), answers, answersGiven }
  onComplete()
  return undefined
}

registerCatalogDomain({ key: "engineAnswerCatalog", collect: collectEngineAnswerCatalog })
