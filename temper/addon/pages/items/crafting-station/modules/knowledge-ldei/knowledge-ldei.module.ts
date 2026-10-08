import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const knowledgeLdei = {
  id: "01a0621c-516c-7e6c-b88e-6a86a6f54d21",
  type: "page-type/module",
  slug: "knowledge-ldei",
  definition: "a character's knowledge wrapped as text another account can read",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A share is held to the characters one edit box has.",
    },
  ],
  createdAt: "2026-09-02T12:33:38.156Z",
  updatedAt: "2026-09-22T10:05:23.000Z",
} as const satisfies Module
