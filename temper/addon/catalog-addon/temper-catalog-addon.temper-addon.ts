import type { TemperAddon } from "akasha/temper/addon/temper-addon.page-type.types.ts"

export const temperCatalogAddon = {
  id: "01a063ba-94e5-7c5d-b338-174ed9b6a224",
  type: "page-type/temper-addon",
  slug: "temper-catalog-addon",
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
  ],
} as const satisfies TemperAddon
