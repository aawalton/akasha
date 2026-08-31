import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type ReExecAsk = string

export const reExecAsk = {
  id: "01a05810-00ac-7843-9198-1c1fed82fd40",
  pageTypeSlug: "text-property",
  slug: "re-exec-ask",
  propertySlug: "re-exec-ask",
  definition: "the standing of a seat's request to re-exec its supervisor",
  max: 20,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An ask that has been taken up is kept rather than cleared.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that has asked for nothing states nothing here.",
    },
    {
      invariantKind: "stopgap",
      statement: "The standings an ask can be in do not stand as pages.",
    },
  ],
} as const satisfies TextProperty
