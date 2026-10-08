import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileRows = {
  id: "01a05bd6-c530-79f9-8daf-bf756d19f77e",
  type: "page-type/module",
  slug: "file-rows",
  definition: "a file-backed page as a row",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row states its own page type as an address rather than as a bare slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That address is the page's own type where that type is known, not the type asked.",
    },
  ],
  createdAt: "2026-09-01T07:19:56.976Z",
  updatedAt: "2026-09-26T16:38:29.000Z",
} as const satisfies Module
