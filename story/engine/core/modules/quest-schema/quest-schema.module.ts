import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questSchema = {
  id: "01a05b71-e544-7f7a-9dc9-b1677b4e1fc6",
  type: "page-type/module",
  slug: "quest-schema",
  definition: "a quest a game is tracking and whether it is still running",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest stored as offered reads back as active.",
    },
  ],
  createdAt: "2026-09-01T05:29:46.052Z",
  updatedAt: "2026-09-15T18:37:21.000Z",
} as const satisfies Module
