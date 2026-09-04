import type { FileProperty } from "@akasha/pages-system/file-property"

export type RelationWeights = "onnx"

export const relationWeights = {
  id: "01a06d3b-743f-73b0-9d3d-c1ef10d1cb67",
  pageTypeSlug: "file-property",
  slug: "relation-weights",
  propertySlug: "relation-weights",
  definition: "the trained graph saying what one word is to the word it hangs off",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The graph is held in the format the runtime already reads.",
    },
    {
      invariantKind: "departure",
      statement: "The graph is kept outside the commit.",
    },
  ],
} as const satisfies FileProperty
