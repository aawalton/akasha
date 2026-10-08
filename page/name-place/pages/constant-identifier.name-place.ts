import type { NamePlace } from "akasha/page/name-place/name-place.page-type.types.ts"

export const constantIdentifier = {
  id: "01a04fc9-2ad8-7f99-9d3a-bbae29319b17",
  type: "page-type/name-place",
  slug: "constant-identifier",
  definition: "the name data carries at the top of a file, outside any function",
  nameFormat: "name-format/upper-snake-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Data is data whether the data is written out or built as the file loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A regular expression is data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set of fixed words is data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A plain string is data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name bound to a function or to a thing the file acts on is not data wherever that name sits.",
    },
  ],
  createdAt: "2026-08-29T23:09:38.904Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NamePlace
