import type { TemperAddon } from "akasha/temper/addon/temper-addon.page-type.types.ts"

export const temperAddonCatalog = {
  id: "01a063ba-94e5-7c5d-b338-174ed9b6a224",
  type: "page-type/temper-addon",
  slug: "temper-addon-catalog",
  definition: "the add-on reading the game's own reference data and saving it for Temper to use",

  addonManifest: "json",
  bindings: "xml",
  bundleEntry: "module/catalog-entry",
  luaModules: ["lua-module/catalog-config-file"],
  parts: [
    "lua-module/catalog-config-file",
    "module/catalog-api-test",
    "module/catalog-auto-collect",
    "module/catalog-collect-adapters",
    "module/catalog-command",
    "module/catalog-constants",
    "module/catalog-entry",
    "module/catalog-invalidations",
    "module/catalog-public-api",
    "module/catalog-side-file-config",
    "module/datamining-constants",
    "module/datamining-entry",
    "module/datamining-item-miner",
    "module/datamining-quest-miner",
    "module/datamining-saved-variables",
    "type-declaration/catalog-config-global",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The order the collectors are imported in is the order the catalogs are collected.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog already saved is left alone rather than collected a second time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game version different from the saved one empties every catalog first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Collection starts a delay after the player first becomes active.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Collection starts once for each time the game client loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collector that fails is skipped with its reason kept beside the catalog.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game names no way to list its items.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every item id is tried in turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mining runs in batches so the game stays playable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mining that has run past the stated misses is complete.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What mining takes lands in the saved variables rather than over the wire.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mining survives a reload of the interface.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game writes saved variables only as the client shuts down.",
    },
  ],
} as const satisfies TemperAddon
