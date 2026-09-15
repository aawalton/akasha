import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const typeGenerator = {
  id: "01a0879f-931a-78e7-a5ea-03409cb5ee56",
  type: "page-type/file-property",
  slug: "type-generator",
  propertySlug: "type-generator",
  definition: "the code that writes the type a page type has",
  extensions: ["ts"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type stating this states every file that code writes beside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The code here exports a function named `generateTypes`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That function answers the bodies to write rather than writing them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The code here may export a function named `couldTurn`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That function says whether a change could turn what this generator writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The code exporting no such function is run over every change.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
