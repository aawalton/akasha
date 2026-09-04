import type { Module } from "../../code-system/modules/module.page-type.ts"

export const sender = {
  id: "01a05bcd-25e3-7ad8-94f5-51861579256d",
  pageTypeSlug: "module",
  slug: "sender",
  definition: "the address and domain a From header carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An address inside angle brackets wins over the text standing around that address.",
    },
    {
      invariantKind: "departure",
      statement: "An address is lowercased before anything compares the address.",
    },
    {
      invariantKind: "departure",
      statement: "An address holding no separator carries an empty domain.",
    },
  ],
} as const satisfies Module
