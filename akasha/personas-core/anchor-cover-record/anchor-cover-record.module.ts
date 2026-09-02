import type { Module } from "../../code-system/modules/module.page-type.ts"

export const anchorCoverRecord = {
  id: "01a05b70-a58c-73a5-a84d-1f61812a92fd",
  pageTypeSlug: "module",
  slug: "anchor-cover-record",
  definition: "the record written for a persona's anchor image and for her cover image at a level",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An anchor is matched by the persona alone.",
    },
    {
      invariantKind: "departure",
      statement: "A field left unstated is left out of the record rather than set to nothing.",
    },
  ],
} as const satisfies Module
