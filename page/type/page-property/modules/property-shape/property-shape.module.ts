import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyShape = {
  id: "01a0a2b4-adec-7d23-a49b-d0b4eeefdb1f",
  type: "module",
  slug: "property-shape",
  definition: "what a page property is, as the file beside that property holds it",
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
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
