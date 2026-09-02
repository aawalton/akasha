import type { EsoAddon } from "../../code-system/eso-addon/eso-addon.page-type.ts"

export const temperLibSets = {
  id: "01a0617b-4b72-7c64-bc02-7f49e4f6ee46",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-sets",
  definition: "an addon library naming every gear set in the game and saying where each one drops",
  manifest: "json",
  addonManifest: "json",
  partSlugs: ["module/lib-sets-casts", "module/lib-sets-bool-pair"],
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
