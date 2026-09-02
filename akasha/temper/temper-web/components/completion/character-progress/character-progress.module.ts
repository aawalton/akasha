import type { Module } from "@akasha/code-system/module"

export const characterProgress = {
  id: "01a06421-f74b-78cf-a4a8-43342bc70016",
  pageTypeSlug: "module",
  slug: "character-progress",
  definition: "each character's progress worked out from the catalogs and the saved data",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The catalog files its character-side tree under the `character` category.",
    },
    {
      invariantKind: "departure",
      statement: "The progress transforms filter on the same word.",
    },
    {
      invariantKind: "departure",
      statement: "The two catalogs are passed ahead of the account collectibles.",
    },
    {
      invariantKind: "departure",
      statement: "Every argument to the character transform is written out.",
    },
    {
      invariantKind: "departure",
      statement: "Misplacing an argument is a type error rather than a silent rebinding.",
    },
  ],
} as const satisfies Module
