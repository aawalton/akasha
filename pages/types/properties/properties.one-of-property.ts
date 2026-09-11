import type { OneOfProperty } from "akasha/pages/one-of-properties/one-of-property.page-type.types.ts"

export const properties = {
  id: "01a04df3-6848-7e77-ba2c-9399e3f6a356",
  type: "one-of-property",
  slug: "properties",
  propertySlug: "properties",
  definition: "the properties a page type adds, and the inherited properties it narrows",
  members: ["record-property/many-declaration", "record-property/single-declaration"],
  renderedAs: "json",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type declares the properties the page type adds.",
    },
    {
      invariantKind: "departure",
      statement: "A page type takes the rest from the type the page type extends.",
    },
    {
      invariantKind: "departure",
      statement: "Optional becomes required.",
    },
    {
      invariantKind: "departure",
      statement: "A length only falls.",
    },
    {
      invariantKind: "departure",
      statement: "A unique kind only narrows.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration stating no unique kind takes the kind its property states.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a property is carried once or many times never changes.",
    },
    {
      invariantKind: "departure",
      statement: "The shape a property has belongs to the property.",
    },
    {
      invariantKind: "departure",
      statement: "How a property is carried belongs here.",
    },
    {
      invariantKind: "departure",
      statement: "Which member a declaration is read as is told by the one field parting them.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value is committed unless the declaration with that value says that value is not.",
    },
    {
      invariantKind: "departure",
      statement: "A value is open unless the declaration with that value says that value is not.",
    },
  ],
  types: "ts",
} as const satisfies OneOfProperty
