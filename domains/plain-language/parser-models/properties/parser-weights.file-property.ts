import type { FileProperty } from "@akasha/pages-system/file-property"

export type ParserWeights = "onnx"

export const parserWeights = {
  id: "01a06d3b-743e-7a19-bfa1-9abb1cb17381",
  pageTypeSlug: "file-property",
  slug: "parser-weights",
  propertySlug: "parser-weights",
  definition: "the trained graph saying which word a word hangs off",
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
