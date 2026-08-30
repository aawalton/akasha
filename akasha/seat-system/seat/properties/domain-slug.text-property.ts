import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type DomainSlug = string

export const domainSlug = {
  id: "01a05371-8394-75c5-9866-beca032de307",
  pageTypeSlug: "text-property",
  slug: "domain-slug",
  propertySlug: "domain-slug",
  definition: "the domain whose work a seat answers to",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A person and a persona each extend a domain, so a seat assigned to either is assigned to a domain.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "This holds text because five of the domains the seats standing today name have not moved into the new system.",
    },
    {
      invariantKind: "gap",
      statement: "This is a relation to a domain.",
    },
  ],
} as const satisfies TextProperty
