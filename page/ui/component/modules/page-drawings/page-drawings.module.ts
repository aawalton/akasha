import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageDrawings = {
  id: "01a0a062-3e90-76ba-8810-aa82e04a0028",
  type: "page-type/module",
  slug: "page-drawings",
  definition: "the component drawing a page of each page type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A drawing is found by the page type it sits beside rather than by a registration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundler reads every drawing in the tree before the code runs.",
    },
  ],
  createdAt: "2026-09-14T14:46:28.240Z",
  updatedAt: "2026-09-22T14:00:26.000Z",
} as const satisfies Module
