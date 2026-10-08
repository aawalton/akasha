import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const leadsInit = {
  id: "01a06274-b08a-713c-8263-d0c81956cd55",
  type: "page-type/module",
  slug: "leads-init",
  definition: "the lead window's one-time setup",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The window is built hidden and shown only when asked for.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every control reached here is declared by the markup rather than by code.",
    },
  ],
  createdAt: "2026-09-02T14:10:09.674Z",
  updatedAt: "2026-09-22T02:33:54.000Z",
} as const satisfies Module
