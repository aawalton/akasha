import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const troubles = {
  id: "01a16423-c0bb-75f7-924a-c933a73311b9",
  type: "page-type/text-property",
  slug: "troubles",
  propertySlug: "troubles",
  definition: "a trouble a running service sees in itself",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service publishes here each trouble the service sees in itself now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service seeing no trouble publishes nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trouble here is published by the service itself rather than by a watcher.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service publishing a trouble is broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trouble is said as what follows the unit's name in a sentence.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-22T15:03:47.130Z",
  updatedAt: "2026-10-22T15:03:47.130Z",
} as const satisfies TextProperty
