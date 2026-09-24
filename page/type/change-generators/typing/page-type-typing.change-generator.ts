import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const pageTypeTyping = {
  id: "01a0d4f0-636d-77e1-baf8-cf329dc2418b",
  type: "page-type/change-generator",
  slug: "page-type-typing",
  definition: "the type, schema and shapes each page type states, written beside that page type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page type stating a type, schema or shapes file has that file written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files are worked out again only where the change could turn a page type.",
    },
  ],
} as const satisfies ChangeGenerator
