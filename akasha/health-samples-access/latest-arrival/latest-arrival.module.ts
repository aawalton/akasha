import type { Module } from "../../code-system/modules/module.page-type.ts"

export const latestArrival = {
  id: "01a05bc7-9129-7005-b4b8-2f62e20c1b94",
  pageTypeSlug: "module",
  slug: "latest-arrival",
  definition: "when the newest stored reading of one metric arrived",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The answer is read off the readings that started at or after a stated instant.",
    },
    {
      invariantKind: "departure",
      statement: "A row holding no arrival is dropped rather than counted as the earliest.",
    },
    {
      invariantKind: "departure",
      statement: "A metric no reading arrived under is answered absent.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is read off the rows kept beside the ESO day the reading began in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks the pages system service.",
    },
  ],
} as const satisfies Module
