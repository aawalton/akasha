import type { Module } from "@akasha/code-system/module"

export const libSetsDropNameNamesEn = {
  id: "01a061d6-3e27-7dcf-aff1-caab31397e85",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-name-names-en",
  definition: "the English name of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name here may be read from the game's own strings rather than written out.",
    },
  ],
} as const satisfies Module
