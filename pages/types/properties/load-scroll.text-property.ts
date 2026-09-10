import type { TextProperty } from "../../text-properties/text-property.page-type.types.ts"

export type LoadScroll = string

export const loadScroll = {
  id: "01a0683a-620a-720b-9442-1f4e5f29ea33",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "load-scroll",
  propertySlug: "load-scroll",
  definition: "the place in a page the reader is put at as the page opens",
  maxLength: 8,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page opens at its start or its end or its newest part or where reading stopped.",
    },
    {
      invariantKind: "departure",
      statement: "A page type naming no place opens a page at its start.",
    },
    {
      invariantKind: "stopgap",
      statement: "The places a page can open at do not stand as pages.",
    },
  ],
} as const satisfies TextProperty
