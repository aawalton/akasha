import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const builtFromRoot = {
  id: "01a17c8f-fe74-763e-8ce6-cc9aa96ff4f8",
  type: "page-type/boolean-property",
  slug: "built-from-root",
  propertySlug: "built-from-root",
  definition: "whether a recipe's build is handed the repository's root rather than its package",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe stating nothing here is handed the package it sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe copying files from outside its package is handed the root.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T08:52:54.003Z",
  updatedAt: "2026-10-27T08:52:54.003Z",
} as const satisfies BooleanProperty
