import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const argumentValue = {
  id: "01a093fd-34bc-7502-9460-0a9278a3c9c8",
  type: "select-property",
  slug: "argument-value",
  propertySlug: "value",
  definition: "what an argument carries after the way that argument is spelled",
  values: ["none", "text", "whole-number", "true-or-false", "path"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An argument carrying no value is said and nothing follows it.",
    },
    {
      invariantKind: "departure",
      statement: "A path is read against the repository root rather than the calling folder.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
