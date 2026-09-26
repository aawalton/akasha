import type { ConsolidationMigration } from "akasha/temper/eso/saved-variable/saved-vars-migration/modules/saved-vars-migration/saved-vars-migration.module.code.ts"

export const WORLD_MIGRATIONS = [
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
    runFor: "TemperWorld",
    spec: {
      absorbedFileBase: "M0RMarkers",
      absorbedGlobal: "Markers",
      targetFileBase: "TemperWorld",
      renamedTo: "TemperWorldMarkers",
    },
  },
  {
    mode: "append",
    runFor: "TemperWorld",
    spec: {
      absorbedFileBase: "M0RMarkers",
      absorbedGlobal: "M0RMarkersSavedMarkers",
      targetFileBase: "TemperWorld",
      renamedTo: "TemperWorldSavedMarkers",
    },
  },
] as const satisfies readonly ConsolidationMigration[]
