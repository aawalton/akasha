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
]

const NOTHING = 0

function writable(this: void, held: unknown): held is EngineAnswer {
  if (typeof held === "number") return held * NOTHING === NOTHING
  return typeof held === "string" || typeof held === "boolean"
}

function answersOf(this: void, name: string): EngineAnswer[] | undefined {
  const held: unknown = _G[name]
  if (typeof held !== "function") return undefined
  const asked = held as (this: void) => LuaMultiReturn<unknown[]>
  const [ok, packed] = pcall((): unknown[] => [...asked()])
  if (!ok) return undefined
  const kept: EngineAnswer[] = []
  for (const one of packed) {
    if (!writable(one)) return kept
    kept[kept.length] = one
  }
  return kept
}

function collectEngineAnswerCatalog(this: void, onComplete: (this: void) => void): undefined {
  const answers: Record<string, EngineAnswer[]> = {}
  for (const name of ASKED) {
    const got = answersOf(name)
    if (got !== undefined) answers[name] = got
  }
  getSavedVariables().engineAnswerCatalog = { apiVersion: GetAPIVersion(), answers }
  onComplete()
  return undefined
}

registerCatalogDomain({ key: "engineAnswerCatalog", collect: collectEngineAnswerCatalog })
