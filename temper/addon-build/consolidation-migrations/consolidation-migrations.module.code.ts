import type { ConsolidationMigration } from "@akasha/temper-saved-vars-migration/saved-vars-migration"

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
    runFor: "TemperCompanions",
    spec: {
      absorbedFileBase: "FCOCompanion",
      absorbedGlobal: "FCOCompanion_Settings",
      targetFileBase: "TemperCompanions",
    },
  },
  {
    mode: "append",
    runFor: "TemperCompanions",
    spec: {
      absorbedFileBase: "FCOCompanion",
      absorbedGlobal: "FCOCompanion_Settings_PerToon",
      targetFileBase: "TemperCompanions",
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
    runFor: "TemperCollections",
    spec: {
      absorbedFileBase: "TemperSkyShards",
      absorbedGlobal: "TemperSkyShards_SavedVariables",
      targetFileBase: "TemperCollections",
    },
  },
  {
    mode: "append",
    runFor: "TemperCollections",
    spec: {
      absorbedFileBase: "TemperLoreBooks",
      absorbedGlobal: "TemperLoreBooks_SavedVariables",
      targetFileBase: "TemperCollections",
    },
  },
  {
    mode: "append",
    runFor: "TemperCollections",
    spec: {
      absorbedFileBase: "TemperLostTreasure",
      absorbedGlobal: "TemperLostTreasure_Account",
      targetFileBase: "TemperCollections",
    },
  },
  {
    mode: "append",
    runFor: "TemperCollections",
    spec: {
      absorbedFileBase: "TemperLostTreasure",
      absorbedGlobal: "TemperLostTreasure_Character",
      targetFileBase: "TemperCollections",
    },
  },
  {
    mode: "append",
    runFor: "TemperCollections",
    spec: {
      absorbedFileBase: "TemperDungeonChampions",
      absorbedGlobal: "TemperDungeonChampions_SavedVariables",
      targetFileBase: "TemperCollections",
    },
  },
  {
    mode: "append",
    runFor: "TemperCollections",
    spec: {
      absorbedFileBase: "TemperItemBrowser",
      absorbedGlobal: "TemperItemBrowser_SavedVariables",
      targetFileBase: "TemperCollections",
    },
  },
  {
    mode: "append",
    runFor: "TemperEvents",
    spec: {
      absorbedFileBase: "TemperICTheNextBoss",
      absorbedGlobal: "TemperICTheNextBoss_SavedVariables",
      targetFileBase: "TemperEvents",
    },
  },
  {
    mode: "append",
    runFor: "TemperAntiquities",
    spec: {
      absorbedFileBase: "TemperLeads",
      absorbedGlobal: "TemperLeads_SavedVariables",
      targetFileBase: "TemperAntiquities",
    },
  },
  {
    mode: "append",
    runFor: "TemperHousing",
    spec: {
      absorbedFileBase: "TemperPortToFriendsHouse",
      absorbedGlobal: "TemperPortToFriendsHouse_SavedVariables",
      targetFileBase: "TemperHousing",
    },
  },
  {
    mode: "append",
    runFor: "TemperNavigation",
    spec: {
      absorbedFileBase: "TemperMapPins",
      absorbedGlobal: "TemperMapPins_SavedVars",
      targetFileBase: "TemperNavigation",
    },
  },
  {
    mode: "append",
    runFor: "TemperNavigation",
    spec: {
      absorbedFileBase: "TemperMapPins",
      absorbedGlobal: "TemperMapPins_SavedGlobal",
      targetFileBase: "TemperNavigation",
    },
  },
  {
    mode: "append",
    runFor: "TemperNavigation",
    spec: {
      absorbedFileBase: "TemperMapPins",
      absorbedGlobal: "TemperMapPins_ChestData",
      targetFileBase: "TemperNavigation",
    },
  },
  {
    mode: "append",
    runFor: "TemperNavigation",
    spec: {
      absorbedFileBase: "TemperMapPins",
      absorbedGlobal: "TemperMapPins_ThievesTrove",
      targetFileBase: "TemperNavigation",
    },
  },
  {
    mode: "append",
    runFor: "TemperNavigation",
    spec: {
      absorbedFileBase: "TemperDestinations",
      absorbedGlobal: "TemperDestinations_SavedVariables",
      targetFileBase: "TemperNavigation",
    },
  },
  {
    mode: "append",
    runFor: "TemperNavigation",
    spec: {
      absorbedFileBase: "TemperVotansMiniMap",
      absorbedGlobal: "TemperVotansMiniMap_SavedVariables",
      targetFileBase: "TemperNavigation",
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
    mode: "rename",
    runFor: "TemperKeybinder",
    oldFileBase: "TemperVotansKeybinder",
    newFileBase: "TemperKeybinder",
    renames: [[/^TemperVotansKeybinder_SavedVariables\s*=/m, "TemperKeybinder_SavedVariables ="]],
  },
] as const satisfies readonly ConsolidationMigration[]
