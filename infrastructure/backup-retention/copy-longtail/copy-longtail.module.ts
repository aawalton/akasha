import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const copyLongtail = {
  id: "01a06863-b0ae-7ca1-800b-d4bd20dd7345",
  pageTypeSlug: "module",
  slug: "copy-longtail",
  definition: "one run bringing the slower store to the units the monthly windows say",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The hasher is proved on bytes of a known hash before any unit is copied.",
    },
    {
      invariantKind: "departure",
      statement: "A unit is complete only once a marker naming what it holds is written into it.",
    },
    {
      invariantKind: "departure",
      statement: "A unit already complete is passed over rather than copied again.",
    },
    {
      invariantKind: "departure",
      statement: "A run past its share of the disk reports that even where the copies went well.",
    },
    {
      invariantKind: "absence",
      statement: "Importing the module starts nothing.",
    },
  ],
} as const satisfies Module
