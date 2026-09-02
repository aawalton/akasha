import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersScribingSources = {
  id: "01a062ed-39c9-700c-9df3-7f4288c3c504",
  pageTypeSlug: "module",
  slug: "characters-scribing-sources",
  definition: "how far a character is through the runs of content a scribing script is earned from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The nearest unfinished tier of a source is the only tier that source reports.",
    },
    {
      invariantKind: "gap",
      statement: "The motifs a source drops are not counted.",
    },
  ],
} as const satisfies Module
