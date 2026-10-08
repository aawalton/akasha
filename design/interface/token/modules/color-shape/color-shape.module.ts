import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const colorShape = {
  id: "01a05c97-5300-76a3-aa25-55af6fe31b6d",
  type: "page-type/module",
  slug: "color-shape",
  definition: "the shape a color is written in, and the reading of a hex into it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The shape every color in this package is written in is declared here.",
    },
  ],
  createdAt: "2026-09-01T10:50:16.192Z",
  updatedAt: "2026-09-15T18:34:11.000Z",
} as const satisfies Module
