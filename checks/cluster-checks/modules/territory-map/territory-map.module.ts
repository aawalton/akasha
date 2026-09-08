import type { Module } from "@akasha/code/module"

export const territoryMap = {
  id: "01a06890-2000-7000-9000-00000000000a",
  pageTypeSlug: "module",
  slug: "territory-map",
  definition: "which package each addon the temper port holds is under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder naming no held addon is refused rather than read as an empty map.",
    },
    {
      invariantKind: "departure",
      statement: "A page carrying a key its page type does not declare is refused at its landing.",
    },
    {
      invariantKind: "departure",
      statement: "The held addon pages are read from the checkout this code sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A package is the folder holding the addon page a held addon page names.",
    },
    {
      invariantKind: "departure",
      statement: "A held addon page naming an addon page no folder holds is refused.",
    },
  ],
} as const satisfies Module
