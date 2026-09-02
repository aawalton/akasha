import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperCharactersAddon = {
  id: "01a062d2-92a3-7000-a57a-3584d7763d6e",
  pageTypeSlug: "eso-addon",
  slug: "temper-characters-addon",
  definition:
    "the add-on reading each character's completion out of the game and showing what is left to do",
  manifest: "json",
  addonManifest: "json",
  bindings: "xml",
  luaModuleSlugs: ["lua-module/characters-config-global"],
  partSlugs: [
    "eso-interface/skill-point-finder-layout",
    "lua-module/characters-config-global",
    "module/characters-alliance-rank",
    "module/characters-bag-size",
    "module/characters-cadwell",
    "module/characters-collectibles",
    "module/characters-collector-merge",
    "module/characters-current-entry",
    "module/characters-keyed-merge",
    "module/characters-list",
    "module/characters-mount-training",
    "module/characters-points-of-interest",
    "module/characters-populated-name",
    "module/characters-progress-format",
    "module/characters-scribing-merge",
    "module/characters-skill-lines-merge",
    "module/characters-trait-research-merge",
    "module/characters-zone-completion",
  ],
  interfaceSlugs: ["skill-point-finder-layout"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What this add-on reads out of the game is written to the saved table alone.",
    },
    {
      invariantKind: "departure",
      statement: "The shape of that saved table is declared by a package rather than here.",
    },
  ],
} as const satisfies EsoAddon
