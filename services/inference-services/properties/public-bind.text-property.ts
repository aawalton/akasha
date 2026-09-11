import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const publicBind = {
  id: "01a09098-0b72-771a-9fe2-a9f0fdabfc1d",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "public-bind",
  propertySlug: "public-bind",
  definition: "how far a service's port is reachable",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service reachable across the tailnet says `tailnet`.",
    },
    {
      invariantKind: "departure",
      statement: "A service reachable on its own host alone says `loopback`.",
    },
    {
      invariantKind: "stopgap",
      statement: "The two reaches a service is bound to are no pages.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to a bind.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
