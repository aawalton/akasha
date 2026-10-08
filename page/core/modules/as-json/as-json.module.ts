import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const asJson = {
  id: "01a05cc0-fc8b-72c7-b9e9-7a512a9927d8",
  type: "page-type/module",
  slug: "as-json",
  definition: "a value called json without being read to see whether it is",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here reads the value this module renames.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller wanting the value read names `is-json` instead.",
    },
  ],
  createdAt: "2026-09-01T11:35:46.571Z",
  updatedAt: "2026-09-15T18:35:14.000Z",
} as const satisfies Module
