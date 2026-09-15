import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyShape = {
  id: "01a0a2b4-adec-7d23-a49b-d0b4eeefdb1f",
  type: "module",
  slug: "property-shape",
  definition: "what a page property is, as the file beside its page type holds it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shape says what the property's own page says and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no property slug has no shape.",
    },
    {
      invariantKind: "departure",
      statement: "A shape written here and a shape read back here are the same shape.",
    },
    {
      invariantKind: "departure",
      statement: "A body holds the shapes in the order their slugs sort in.",
    },
    {
      invariantKind: "departure",
      statement: "A line that reads as no shape is passed over rather than refusing the body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
