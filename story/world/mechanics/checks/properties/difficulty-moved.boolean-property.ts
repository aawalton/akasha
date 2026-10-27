import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const difficultyMoved = {
  id: "01a17ede-24f3-754b-8bdb-70ae3919de8e",
  type: "page-type/boolean-property",
  slug: "difficulty-moved",
  propertySlug: "difficulty-moved",
  definition: "whether a story's difficulty level moves a check's roll",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A check stating nothing here is not moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check settling the player character's own try states true.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A harm roll is not moved, and the level's failure ceiling bounds it.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T19:37:30.098Z",
  updatedAt: "2026-10-27T19:37:30.098Z",
} as const satisfies BooleanProperty
