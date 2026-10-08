import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const argumentValue = {
  id: "01a093fd-34bc-7502-9460-0a9278a3c9c8",
  type: "page-type/select-property",
  slug: "argument-value",
  propertySlug: "value",
  definition: "what an argument carries after the way that argument is spelled",
  values: ["none", "text", "whole-number", "true-or-false", "path"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An argument carrying no value is said and nothing follows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path is read against the repository root and whether it must land inside belongs to the command.",
    },
    { decisionKind: "decision-kind/absence", statement: "No value here is a body piped in." },
  ],
  types: "ts",
  createdAt: "2026-09-12T05:00:39.996Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies SelectProperty
