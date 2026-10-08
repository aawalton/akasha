import type { NamePlace } from "akasha/page/name-place/name-place.page-type.types.ts"

export const derivedIdentifier = {
  id: "01a04fc9-2ad9-76c1-9144-cbcca3d44196",
  type: "page-type/name-place",
  slug: "derived-identifier",
  definition: "the name a value carries inside the function working it out",
  nameFormat: "name-format/lower-camel-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name inside a function belongs to one call rather than to the file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A parameter the body does not read opens with an underscore.",
    },
  ],
  createdAt: "2026-08-29T23:09:38.905Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NamePlace
