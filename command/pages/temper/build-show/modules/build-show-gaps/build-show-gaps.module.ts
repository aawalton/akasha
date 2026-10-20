import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildShowGaps = {
  id: "01a15a05-8c5b-7f35-8402-32478b81f560",
  type: "page-type/module",
  slug: "build-show-gaps",
  definition: "where a character falls short of a design build, and how to close each shortfall",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A gap is something the design has that the character lacks or has less of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What only the character has is no gap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gap carries how to close that gap alone on a copy of the character's build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gear slot the character leaves empty is one gap for the whole piece.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is a gap in the bar slot the design puts that skill in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Star points are a gap only where both builds came with a reading's stars.",
    },
  ],
  createdAt: "2026-10-20T15:54:35.482Z",
  updatedAt: "2026-10-20T15:54:35.482Z",
} as const satisfies Module
