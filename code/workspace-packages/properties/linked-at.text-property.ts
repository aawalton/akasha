import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const linkedAt = {
  id: "01a08e0e-63aa-73e3-9073-68366457ff76",
  type: "text-property",
  slug: "linked-at",
  propertySlug: "linked-at",
  definition: "where outside akasha a link reaches the folder a page owns",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder a link reaches is the folder holding the page stating this.",
    },
    {
      invariantKind: "departure",
      statement: "A path opening with a tilde is read under the home of whoever places the link.",
    },
    {
      invariantKind: "departure",
      statement: "A page states where its folder is reached rather than a script holding a table.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
