import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const savedVariablesReader = {
  id: "01a06084-d41a-7898-b2c6-0be1faa981da",
  pageTypeSlug: "module",
  slug: "saved-variables-reader",
  definition: "one summary for each account, read out of the catalog addon's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Text the parser refuses answers an empty list.",
    },
    {
      invariantKind: "departure",
      statement: "An account key opens with `@` and every other key is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "An account whose account-wide table the zod schema refuses is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A key outside the metadata set is reported as a domain key that is present.",
    },
    {
      invariantKind: "departure",
      statement: "A missing count reads as zero and a missing flag reads as false.",
    },
  ],
} as const satisfies Module
