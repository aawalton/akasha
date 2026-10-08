import type { NamePlace } from "akasha/page/name-place/name-place.page-type.types.ts"

export const componentIdentifier = {
  id: "01a04fc9-2ada-7231-b57f-de98579a51d4",
  type: "page-type/name-place",
  slug: "component-identifier",
  definition: "the name a view component carries in code",
  nameFormat: "name-format/upper-camel-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A component is written where a type would be read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file with a component is named in lower kebab like every other file.",
    },
  ],
  createdAt: "2026-08-29T23:09:38.906Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NamePlace
