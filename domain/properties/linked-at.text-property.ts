import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const linkedAt = {
  id: "01a08e0e-63aa-73e3-9073-68366457ff76",
  type: "page-type/text-property",
  slug: "linked-at",
  propertySlug: "linked-at",
  definition: "where outside akasha a link reaches the folder a page owns",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder a link reaches is the folder holding the page stating this.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path opening with a tilde is read under the home of whoever places the link.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page states where its folder is reached rather than a script holding a table.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-11T01:21:42.826Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
