import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageClearing = {
  id: "01a0d88f-5018-77fa-93cd-f9916aa933fc",
  type: "page-type/module",
  slug: "page-clearing",
  definition: "whether the keys a write clears are keys a page can be written without",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key cleared that the page type declares no property for is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key both cleared and handed over is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key kept beside the page is refused as cleared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key held in a file is refused as cleared, since the file would stay.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page.",
    },
  ],
} as const satisfies Module
