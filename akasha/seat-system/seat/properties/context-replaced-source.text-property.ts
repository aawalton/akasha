import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type ContextReplacedSource = string

export const contextReplacedSource = {
  id: "01a05810-00aa-7789-aa54-f9c7e5dd0f48",
  pageTypeSlug: "text-property",
  slug: "context-replaced-source",
  propertySlug: "context-replaced-source",
  definition: "how a seat came by the context it is working in",
  max: 20,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A context is either started fresh or carried across a restart.",
    },
    {
      invariantKind: "departure",
      statement: "A context carried across a restart replaces nothing.",
    },
    {
      invariantKind: "stopgap",
      statement: "The ways a context is come by do not stand as pages.",
    },
  ],
} as const satisfies TextProperty
