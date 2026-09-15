import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTypeDescent = {
  id: "01a04eca-11d6-7481-9151-c390edc031c2",
  type: "module",
  slug: "page-type-descent",
  definition: "which page types are under a given page type",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Descent is walked down the reverse of `extends-type` read beside each page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is under itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page type is under `page`, so that descent is every page type filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type reaching no parent it names is under no other page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller with the index as its change leaves that index is answered from that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller names the reading and nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug two page types carry is under every type either names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here walks the pages.",
    },
  ],
} as const satisfies Module
