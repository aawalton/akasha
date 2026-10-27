import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const testing = {
  id: "01a17fb6-baa1-7e85-b2c0-43d4f59bd685",
  type: "page-type/boolean-property",
  slug: "testing",
  propertySlug: "testing",
  definition: "whether a world is kept for agents testing the engine",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A world stating nothing here is no testing world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No story in a testing world is offered to Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a story in a testing world is cloned, and only a clone in one is removed.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T23:34:04.191Z",
  updatedAt: "2026-10-27T23:34:04.191Z",
} as const satisfies BooleanProperty
