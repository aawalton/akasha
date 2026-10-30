import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sampleRows = {
  id: "01a05bc7-9129-7003-ad69-0d84f3a9d2ea",
  type: "page-type/module",
  slug: "sample-rows",
  definition: "how code reads a health sample from a stored row",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row naming a metric nobody knows is answered as nothing rather than throwing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row whose value is no finite number is answered as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value stored as text is read as the number the value spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the row does not have reads as the empty string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row beside an akasha page spells its keys in camel.",
    },
  ],
  createdAt: "2026-09-01T07:03:20.617Z",
  updatedAt: "2026-10-30T15:29:26.425Z",
} as const satisfies Module
