import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSetTextSetTextFields = {
  id: "01a06231-8f1f-73ea-b8fc-4fb6e3b80305",
  type: "page-type/module",
  slug: "sets-set-text-set-text-fields",
  definition: "which pieces of a set's text are worth computing and the computing of them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A piece is skipped when neither the settings nor the pattern asks for that piece.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Drop text identical to the set type text is emptied out.",
    },
  ],
  createdAt: "2026-09-02T12:56:50.207Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
