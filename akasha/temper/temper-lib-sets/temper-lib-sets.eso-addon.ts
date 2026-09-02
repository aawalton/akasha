import type { EsoAddon } from "../../code-system/eso-addon/eso-addon.page-type.ts"

export const temperLibSets = {
  id: "01a0617b-4b72-7c64-bc02-7f49e4f6ee46",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-sets",
  definition: "an addon library naming every gear set in the game and saying where each one drops",
  manifest: "json",
  addonManifest: "json",
  partSlugs: [
    "module/lib-sets-casts",
    "module/lib-sets-bool-pair",
    "eso-interface/lib-sets-copy-text-dialog",
    "eso-interface/lib-sets-search-ui-shared-xml",
    "eso-interface/lib-sets-search-ui-keyboard-xml",
    "type-declaration/lib-sets-api",
    "type-declaration/lib-sets-api-2",
    "type-declaration/lib-sets-api-3",
    "type-declaration/lib-sets-api-4",
    "type-declaration/lib-sets-api-5",
    "type-declaration/lib-sets-constant-shapes",
    "type-declaration/lib-sets-copy-dialog-shapes",
    "type-declaration/lib-sets-drop-mechanic-ids",
    "type-declaration/lib-sets-misc-ids",
    "type-declaration/lib-sets-search-ui-globals",
    "type-declaration/lib-sets-search-ui-shapes",
    "type-declaration/lib-sets-search-ui-shapes-2",
    "type-declaration/lib-sets-search-ui-shapes-3",
    "type-declaration/lib-sets-search-ui-shapes-4",
    "type-declaration/lib-sets-set-type-ids",
    "type-declaration/lib-sets-table-keys",
  ],
  interfaceSlugs: [
    "lib-sets-copy-text-dialog",
    "lib-sets-search-ui-shared-xml",
    "lib-sets-search-ui-keyboard-xml",
  ],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A caller reaches this library through a game global rather than an import.",
    },
    {
      invariantKind: "departure",
      statement: "Set data is taken from the upstream library at a pinned commit.",
    },
    {
      invariantKind: "departure",
      statement: "A set is looked up by its numeric set id.",
    },
  ],
} as const satisfies EsoAddon
