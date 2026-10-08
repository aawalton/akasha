import type { NamePlace } from "akasha/page/name-place/name-place.page-type.types.ts"

export const typeIdentifier = {
  id: "01a04fc9-2ad6-7975-b70f-a1d56a933ee6",
  type: "page-type/name-place",
  slug: "type-identifier",
  definition: "the name a type carries in code",
  nameFormat: "name-format/upper-camel-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A type is named for the thing the type has rather than for the file the type is in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type and the value of the same name are parted by their case alone.",
    },
  ],
  createdAt: "2026-08-29T23:09:38.902Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NamePlace
