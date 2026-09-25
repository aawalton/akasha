import type { OneOfProperty } from "akasha/page/one-of-property/one-of-property.page-type.types.ts"

export const defaultValue = {
  id: "01a05a49-22f2-722f-8e3e-acd6d81b5c28",
  type: "page-type/one-of-property",
  slug: "default-value",
  propertySlug: "default",
  definition: "the value a writer states for a property when it is told none",
  members: [
    "boolean-property/default-boolean",
    "number-property/default-number",
    "text-property/default-text",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A default is the value a writer states when the writer is told nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page has no value the page does not state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A default does not make a required property optional.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation's default is text holding the address of the page that default names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No member is a relation, since a relation member refuses the text a default holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A default stands on the declaration rather than on the property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One property takes a different default under each page type declaring the property.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A default is written as text whatever kind the property the default stands for holds.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A default has the kind its property has.",
    },
  ],
  types: "ts",
} as const satisfies OneOfProperty
