import type { ConsolidationMigration } from "akasha/temper/eso/saved-variable/saved-vars-migration/modules/saved-vars-migration/saved-vars-migration.module.code.ts"

export const CONSOLIDATION_MIGRATIONS = [
  {
    mode: "append",
    runFor: "TemperCombat",
    spec: {
      absorbedFileBase: "TemperActions",
      absorbedGlobal: "TemperActions_SavedVariables",
      targetFileBase: "TemperCombat",
    },
  },
  {
    mode: "append",
    runFor: "TemperCharacters",
    spec: {
      absorbedFileBase: "TemperSkillPointFinder",
      absorbedGlobal: "TemperSkillPointFinder_SavedVariables",
      targetFileBase: "TemperCharacters",
    },
  },
  {
    mode: "append",
    runFor: "TemperCharacters",
    spec: {
      absorbedFileBase: "TemperCompanions",
      absorbedGlobal: "TemperCompanions_SavedVariables",
      targetFileBase: "TemperCharacters",
    },
  },
  {
    mode: "append",
    runFor: "TemperCharacters",
    spec: {
      absorbedFileBase: "TemperCompanions",
      absorbedGlobal: "FCOCompanion_Settings",
      targetFileBase: "TemperCharacters",
    },
  },
  {
    mode: "append",
    runFor: "TemperCharacters",
    spec: {
      absorbedFileBase: "TemperCompanions",
      absorbedGlobal: "FCOCompanion_Settings_PerToon",
      targetFileBase: "TemperCharacters",
    },
  },
  {
    mode: "append",
    runFor: "TemperCharacters",
    spec: {
      absorbedFileBase: "FCOCompanion",
      absorbedGlobal: "FCOCompanion_Settings",
      targetFileBase: "TemperCharacters",
    },
  },
  {
    mode: "append",
    runFor: "TemperCharacters",
    spec: {
      absorbedFileBase: "FCOCompanion",
      absorbedGlobal: "FCOCompanion_Settings_PerToon",
      targetFileBase: "TemperCharacters",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperPotionMaker",
      absorbedGlobal: "TemperPotionMaker_SavedVariables",
      targetFileBase: "TemperItems",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "WritWorthy",
      absorbedGlobal: "WritWorthyVars",
      targetFileBase: "TemperItems",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperMasterWritInventoryMarker",
      absorbedGlobal: "TemperMasterWritInventoryMarker_SavedVariables",
      targetFileBase: "TemperItems",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "LibCharacterKnowledge",
      absorbedGlobal: "LibCharacterKnowledgeData",
      targetFileBase: "TemperItems",
      renamedTo: "TemperItemsCharacterKnowledgeData",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "LibSets",
      absorbedGlobal: "LibSets_SV_Data",
      targetFileBase: "TemperItems",
      renamedTo: "TemperItemsSetsData",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperCrafting",
      absorbedGlobal: "TemperCrafting_Account",
      targetFileBase: "TemperItems",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperCrafting",
      absorbedGlobal: "TemperCrafting_Character",
      targetFileBase: "TemperItems",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperCrafting",
      absorbedGlobal: "TemperPotionMaker_SavedVariables",
      targetFileBase: "TemperItems",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperCrafting",
      absorbedGlobal: "WritWorthyVars",
      targetFileBase: "TemperItems",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperCrafting",
      absorbedGlobal: "TemperMasterWritInventoryMarker_SavedVariables",
      targetFileBase: "TemperItems",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperCrafting",
      absorbedGlobal: "LibZone_SV_Data",
      targetFileBase: "TemperItems",
      renamedTo: "TemperItemsZoneData",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperCrafting",
      absorbedGlobal: "LibZone_Localized_SV_Data",
      targetFileBase: "TemperItems",
      renamedTo: "TemperItemsZoneLocalizedData",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperCrafting",
      absorbedGlobal: "LibZone_GeoDebug_SV_Data",
      targetFileBase: "TemperItems",
      renamedTo: "TemperItemsZoneGeoDebugData",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperCrafting",
      absorbedGlobal: "LibZone_Debug_SV_Data",
      targetFileBase: "TemperItems",
      renamedTo: "TemperItemsZoneDebugData",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperCrafting",
      absorbedGlobal: "LibCharacterKnowledgeData",
      targetFileBase: "TemperItems",
      renamedTo: "TemperItemsCharacterKnowledgeData",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperCrafting",
      absorbedGlobal: "LibSets_SV_Data",
      targetFileBase: "TemperItems",
      renamedTo: "TemperItemsSetsData",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperCrafting",
      absorbedGlobal: "LibSets_SV_DEBUG_Data",
      targetFileBase: "TemperItems",
      renamedTo: "TemperItemsSetsDebugData",
    },
  },
  {
    mode: "rename",
    runFor: "Temper",
    oldFileBase: "TemperHud",
    newFileBase: "Temper",
    renames: [],
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "TemperICTheNextBoss",
      absorbedGlobal: "TemperICTheNextBoss_SavedVariables",
      targetFileBase: "Temper",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "TemperEvents",
      absorbedGlobal: "TemperICTheNextBoss_SavedVariables",
      targetFileBase: "Temper",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "TemperPortToFriendsHouse",
      absorbedGlobal: "TemperPortToFriendsHouse_SavedVariables",
      targetFileBase: "Temper",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "TemperHousing",
      absorbedGlobal: "TemperPortToFriendsHouse_SavedVariables",
      targetFileBase: "Temper",
    },
  },
  {
    mode: "rename",
    runFor: "TemperWorld",
    oldFileBase: "TemperNavigation",
    newFileBase: "TemperWorld",
    renames: [],
  },
  {
    mode: "append",
    runFor: "TemperWorld",
    spec: {
      absorbedFileBase: "TemperQuests",
      absorbedGlobal: "TemperQuests_SavedVariables",
      targetFileBase: "TemperWorld",
    },
  },
  {
    mode: "append",
    runFor: "TemperWorld",
    spec: {
      absorbedFileBase: "TemperAntiquities",
      absorbedGlobal: "TemperLeads_SavedVariables",
      targetFileBase: "TemperWorld",
    },
  },
  {
    mode: "append",
    runFor: "TemperWorld",
    spec: {
      absorbedFileBase: "TemperCollections",
      absorbedGlobal: "TemperSkyShards_SavedVariables",
      targetFileBase: "TemperWorld",
    },
  },
  {
    mode: "append",
    runFor: "TemperWorld",
    spec: {
      absorbedFileBase: "TemperCollections",
      absorbedGlobal: "TemperLoreBooks_SavedVariables",
      targetFileBase: "TemperWorld",
    },
  },
  {
    mode: "append",
    runFor: "TemperWorld",
    spec: {
      absorbedFileBase: "TemperCollections",
      absorbedGlobal: "TemperLostTreasure_Account",
      targetFileBase: "TemperWorld",
    },
  },
  {
    mode: "append",
    runFor: "TemperWorld",
    spec: {
      absorbedFileBase: "TemperCollections",
      absorbedGlobal: "TemperLostTreasure_Character",
      targetFileBase: "TemperWorld",
    },
  },
  {
    mode: "append",
    runFor: "TemperWorld",
    spec: {
      absorbedFileBase: "TemperCollections",
      absorbedGlobal: "TemperDungeonChampions_SavedVariables",
      targetFileBase: "TemperWorld",
    },
  },
  {
    mode: "append",
    runFor: "TemperWorld",
    spec: {
      absorbedFileBase: "TemperCollections",
      absorbedGlobal: "TemperItemBrowser_SavedVariables",
      targetFileBase: "TemperWorld",
    },
  },
  {
    mode: "append",
    runFor: "TemperWorld",
    spec: {
      absorbedFileBase: "TemperCollections",
      absorbedGlobal: "TemperCollections_TooltipColors",
      targetFileBase: "TemperWorld",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "TemperNoThankYou",
      absorbedGlobal: "TemperNoThankYou_SavedVariables",
      targetFileBase: "Temper",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "TemperFCOChangeStuff",
      absorbedGlobal: "TemperFCOChangeStuff_SavedVariables",
      targetFileBase: "Temper",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "TemperInterface",
      absorbedGlobal: "TemperNoThankYou_SavedVariables",
      targetFileBase: "Temper",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "TemperInterface",
      absorbedGlobal: "TemperFCOChangeStuff_SavedVariables",
      targetFileBase: "Temper",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "LibHistoire",
      absorbedGlobal: "LibHistoire_Settings",
      targetFileBase: "TemperItems",
      renamedTo: "TemperItemsGuildHistorySettings",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "LibHistoire",
      absorbedGlobal: "LibHistoire_GuildHistoryCache",
      targetFileBase: "TemperItems",
      renamedTo: "TemperItemsGuildHistoryCache",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperSales",
      absorbedGlobal: "TemperSales_SavedVariables",
      targetFileBase: "TemperItems",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperSales",
      absorbedGlobal: "LibHistoire_Settings",
      targetFileBase: "TemperItems",
      renamedTo: "TemperItemsGuildHistorySettings",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperSales",
      absorbedGlobal: "LibHistoire_GuildHistoryCache",
      targetFileBase: "TemperItems",
      renamedTo: "TemperItemsGuildHistoryCache",
    },
  },
  {
    mode: "append",
    runFor: "TemperCatalog",
    spec: {
      absorbedFileBase: "TemperDataMining",
      absorbedGlobal: "TemperDataMining_SavedVariables",
      targetFileBase: "TemperCatalog",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "TemperErrors",
      absorbedGlobal: "TemperErrors_SavedVariables",
      targetFileBase: "Temper",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "TemperAddons",
      absorbedGlobal: "TemperAddons_SavedVariables",
      targetFileBase: "Temper",
    },
  },
  {
    mode: "rename",
    runFor: "TemperItems",
    oldFileBase: "TemperInventory",
    newFileBase: "TemperItems",
    renames: [],
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperListings",
      absorbedGlobal: "TemperListings_SavedVariables",
      targetFileBase: "TemperItems",
    },
  },
  {
    mode: "rename",
    runFor: "Temper",
    oldFileBase: "TemperVotansKeybinder",
    newFileBase: "TemperKeybinder",
    renames: [[/^TemperVotansKeybinder_SavedVariables\s*=/m, "TemperKeybinder_SavedVariables ="]],
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "TemperKeybinder",
      absorbedGlobal: "TemperKeybinder_SavedVariables",
      targetFileBase: "Temper",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "LibAsync",
      absorbedGlobal: "AsyncSavedVars",
      targetFileBase: "Temper",
      renamedTo: "TemperAsyncSavedVars",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "LibChatMessage",
      absorbedGlobal: "LibChatMessageSettings",
      targetFileBase: "Temper",
      renamedTo: "TemperChatMessageSettings",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "LibChatMessage",
      absorbedGlobal: "LibChatMessageHistory",
      targetFileBase: "Temper",
      renamedTo: "TemperChatMessageHistory",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "LibScrollableMenu",
      absorbedGlobal: "LibScrollableMenu_SavedVars",
      targetFileBase: "Temper",
      renamedTo: "TemperScrollableMenu_SavedVars",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "LibDebugLogger",
      absorbedGlobal: "LibDebugLoggerSettings",
      targetFileBase: "Temper",
      renamedTo: "TemperDebugLoggerSettings",
    },
  },
  {
    mode: "append",
    runFor: "Temper",
    spec: {
      absorbedFileBase: "LibDebugLogger",
      absorbedGlobal: "LibDebugLoggerLog",
      targetFileBase: "Temper",
      renamedTo: "TemperDebugLoggerLog",
    },
  },
] as const satisfies readonly ConsolidationMigration[]
