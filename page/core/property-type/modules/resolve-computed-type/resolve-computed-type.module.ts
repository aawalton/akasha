import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const resolveComputedType = {
  id: "01a05b92-a9c7-7512-97a6-0038641ce4a3",
  type: "page-type/module",
  slug: "resolve-computed-type",
  definition: "what a computed property type resolves to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A resolved property is drawn by the chain of the type it resolved to.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A chain for a resolved type is taken from a property already carrying one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A resolved type no property to hand carries a chain for keeps its declared chain.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page type slug is written here from a property type.",
    },
  ],
} as const satisfies Module
