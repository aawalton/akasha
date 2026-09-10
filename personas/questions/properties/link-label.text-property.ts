import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type LinkLabel = string

export const linkLabel = {
  id: "01a06823-89b2-700a-8629-c9a7b4b9efeb",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "link-label",
  propertySlug: "label",
  definition: "what a link is called where it is offered",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A label says where the link goes rather than repeating the address.",
    },
  ],
} as const satisfies TextProperty
