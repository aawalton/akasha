import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useReaderMoved = {
  id: "01a0fe61-31e7-71e4-bd78-ab0958933f95",
  type: "page-type/module",
  slug: "use-reader-moved",
  definition: "whether the reader has scrolled a page themselves since it opened",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A wheel, a touch, a key or a pointer press is the reader moving the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scroll the page makes itself, on opening or restoring, is not the reader's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Opening another page starts the reader unmoved again.",
    },
  ],
} as const satisfies Module
