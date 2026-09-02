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
  partSlugs: ["module/characters-alliance-rank"],
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
