import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const argumentValue = {
  id: "01a093fd-34bc-7502-9460-0a9278a3c9c8",
  type: "select-property",
  slug: "argument-value",
  propertySlug: "value",
  definition: "what an argument carries after the way that argument is spelled",
  values: ["none", "text", "whole-number", "true-or-false", "path"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument carrying no value is said and nothing follows it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path is read against the repository root and whether it must land inside belongs to the command.",
    },
    { invariantKind: "invariant-kind/absence", statement: "No value here is a body piped in." },
  ],
  types: "ts",
} as const satisfies SelectProperty
