import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyCarried = {
  id: "01a0cad6-b438-739a-a8a6-4fb44c76dd99",
  type: "page-type/module",
  slug: "property-carried",
  definition: "whether a page type carries a property under a key",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property is carried where a definition states that key.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page type from anywhere.",
    },
  ],
} as const satisfies Module
