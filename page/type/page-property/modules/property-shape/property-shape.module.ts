import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyShape = {
  id: "01a0a2b4-adec-7d23-a49b-d0b4eeefdb1f",
  type: "page-type/module",
  slug: "property-shape",
  definition: "what a page property is, as the file beside its page type holds it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape says what the property's own page says and nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape says whether the property is generated and whether a tool resolves it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape says the group writing the property's file where a group writes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape leaves out what the page does not say rather than stating a default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no property slug has no shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape written here and a shape read back here are the same shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body holds the shapes in the order their slugs sort in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line that reads as no shape is passed over rather than refusing the body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
