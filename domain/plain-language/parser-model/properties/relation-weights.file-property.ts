import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const relationWeights = {
  id: "01a06d3b-743f-73b0-9d3d-c1ef10d1cb67",
  type: "page-type/file-property",
  slug: "relation-weights",
  propertySlug: "relation-weights",
  definition: "the trained graph saying what a word is to the word it hangs off",
  extensions: ["onnx"],
  generated: true,
  runsFileLength: false,
  holdsBytes: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The graph is in the format the runtime already reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The graph is kept outside the commit.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
