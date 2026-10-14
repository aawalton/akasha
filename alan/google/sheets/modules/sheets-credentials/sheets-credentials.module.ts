import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sheetsCredentials = {
  id: "01a13ab0-c506-7251-b02f-86f46695a97b",
  type: "page-type/module",
  slug: "sheets-credentials",
  definition: "a Sheets client's scope and refresh token",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The scope asked for reads and writes every sheet Alan can open.",
    },
  ],
  createdAt: "2026-10-14T13:53:45.733Z",
  updatedAt: "2026-10-14T13:53:45.733Z",
} as const satisfies Module
