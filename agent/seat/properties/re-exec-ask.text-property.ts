import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const reExecAsk = {
  id: "01a05810-00ac-7843-9198-1c1fed82fd40",
  type: "text-property",
  slug: "re-exec-ask",
  propertySlug: "re-exec-ask",
  definition: "the standing of a seat's request to re-exec its supervisor",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ask that has been taken up is kept rather than cleared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat that has asked for nothing states nothing here.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "The standings an ask can be in are no pages.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
