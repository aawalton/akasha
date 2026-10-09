import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const overridesMonarch = {
  id: "01a12221-edea-7954-a0c4-3966c414b28e",
  type: "page-type/boolean-property",
  slug: "overrides-monarch",
  propertySlug: "overrides-monarch",
  definition: "whether a rule replaces a category Monarch gave a transaction",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule stating nothing settles only a transaction Monarch left uncategorized.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An overriding rule reaches every transaction the mirror holds, however old.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An overriding rule never replaces a category this harness decided.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Monarch says nothing of who set a category, so a category Alan set by hand is replaced too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An overriding rule names a category rather than reserving for a person.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-09T19:26:51.369Z",
  updatedAt: "2026-10-09T19:26:51.369Z",
} as const satisfies BooleanProperty
