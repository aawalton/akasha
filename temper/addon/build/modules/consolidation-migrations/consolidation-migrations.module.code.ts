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
    runFor: "TemperCrafting",
    spec: {
      absorbedFileBase: "TemperPotionMaker",
      absorbedGlobal: "TemperPotionMaker_SavedVariables",
      targetFileBase: "TemperCrafting",
    },
  },
  {
    mode: "append",
    runFor: "TemperCrafting",
    spec: {
      absorbedFileBase: "WritWorthy",
      absorbedGlobal: "WritWorthyVars",
      targetFileBase: "TemperCrafting",
    },
  },
  {
    mode: "append",
    runFor: "TemperCrafting",
    spec: {
      absorbedFileBase: "TemperMasterWritInventoryMarker",
      absorbedGlobal: "TemperMasterWritInventoryMarker_SavedVariables",
      targetFileBase: "TemperCrafting",
    },
  },
  {
    mode: "append",
    runFor: "TemperCrafting",
    spec: {
      absorbedFileBase: "LibCharacterKnowledge",
      absorbedGlobal: "LibCharacterKnowledgeData",
      targetFileBase: "TemperCrafting",
    },
  },
  {
    mode: "append",
    runFor: "TemperCrafting",
    spec: {
      absorbedFileBase: "LibSets",
      absorbedGlobal: "LibSets_SV_Data",
      targetFileBase: "TemperCrafting",
    },
  },
  {
    mode: "append",
    runFor: "TemperHud",
    spec: {
      absorbedFileBase: "TemperICTheNextBoss",
      absorbedGlobal: "TemperICTheNextBoss_SavedVariables",
      targetFileBase: "TemperHud",
    },
  },
  {
    mode: "append",
    runFor: "TemperHud",
    spec: {
      absorbedFileBase: "TemperEvents",
      absorbedGlobal: "TemperICTheNextBoss_SavedVariables",
      targetFileBase: "TemperHud",
    },
  },
  {
    mode: "append",
    runFor: "TemperHud",
    spec: {
      absorbedFileBase: "TemperPortToFriendsHouse",
      absorbedGlobal: "TemperPortToFriendsHouse_SavedVariables",
      targetFileBase: "TemperHud",
    },
  },
  {
    mode: "append",
    runFor: "TemperHud",
    spec: {
      absorbedFileBase: "TemperHousing",
      absorbedGlobal: "TemperPortToFriendsHouse_SavedVariables",
      targetFileBase: "TemperHud",
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
    runFor: "TemperInterface",
    spec: {
      absorbedFileBase: "TemperNoThankYou",
      absorbedGlobal: "TemperNoThankYou_SavedVariables",
      targetFileBase: "TemperInterface",
    },
  },
  {
    mode: "append",
    runFor: "TemperInterface",
    spec: {
      absorbedFileBase: "TemperFCOChangeStuff",
      absorbedGlobal: "TemperFCOChangeStuff_SavedVariables",
      targetFileBase: "TemperInterface",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "LibHistoire",
      absorbedGlobal: "LibHistoire_Settings",
      targetFileBase: "TemperItems",
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "LibHistoire",
      absorbedGlobal: "LibHistoire_GuildHistoryCache",
      targetFileBase: "TemperItems",
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
    },
  },
  {
    mode: "append",
    runFor: "TemperItems",
    spec: {
      absorbedFileBase: "TemperSales",
      absorbedGlobal: "LibHistoire_GuildHistoryCache",
      targetFileBase: "TemperItems",
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
    runFor: "TemperHud",
    spec: {
      absorbedFileBase: "TemperErrors",
      absorbedGlobal: "TemperErrors_SavedVariables",
      targetFileBase: "TemperHud",
    },
  },
  {
    mode: "append",
    runFor: "TemperHud",
    spec: {
      absorbedFileBase: "TemperAddons",
      absorbedGlobal: "TemperAddons_SavedVariables",
      targetFileBase: "TemperHud",
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
    runFor: "TemperHud",
    oldFileBase: "TemperVotansKeybinder",
    newFileBase: "TemperKeybinder",
    renames: [[/^TemperVotansKeybinder_SavedVariables\s*=/m, "TemperKeybinder_SavedVariables ="]],
  },
  {
    mode: "append",
    runFor: "TemperHud",
    spec: {
      absorbedFileBase: "TemperKeybinder",
      absorbedGlobal: "TemperKeybinder_SavedVariables",
      targetFileBase: "TemperHud",
    },
  },
] as const satisfies readonly ConsolidationMigration[]
