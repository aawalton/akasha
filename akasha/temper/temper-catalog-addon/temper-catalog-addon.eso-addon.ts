import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperCatalogAddon = {
  id: "01a063ba-94e5-7c5d-b338-174ed9b6a224",
  pageTypeSlug: "eso-addon",
  slug: "temper-catalog-addon",
  definition: "the add-on reading the game's own reference data and saving it for Temper to use",
  manifest: "json",
  addonManifest: "json",
  bindings: "xml",
  bundleEntrySlug: "catalog-entry",
  luaModuleSlugs: ["lua-module/catalog-config-file"],
  partSlugs: [
    "module/catalog-constants",
    "module/catalog-side-file-config",
    "module/catalog-collect-adapters",
    "module/catalog-auto-collect",
    "module/catalog-commands",
    "module/catalog-invalidations",
    "module/catalog-api-test",
    "module/catalog-public-api",
    "module/catalog-entry",
    "lua-module/catalog-config-file",
    "type-declaration/catalog-config-global",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The order the collectors are imported in is the order the catalogs are collected.",
    },
    {
      invariantKind: "departure",
      statement: "A catalog already saved is left alone rather than collected a second time.",
    },
    {
      invariantKind: "departure",
      statement: "A game version different from the saved one clears every catalog.",
    },
    {
      invariantKind: "departure",
      statement: "Collection starts a delay after the player first becomes active.",
    },
    {
      invariantKind: "departure",
      statement: "Collection starts once for each time the game client loads.",
    },
    {
      invariantKind: "departure",
      statement: "A collector that fails is skipped with its reason kept beside the catalog.",
    },
    {
      invariantKind: "constraint",
      statement: "The game reloads an addon only when the whole client reloads.",
    },
  ],
} as const satisfies EsoAddon
