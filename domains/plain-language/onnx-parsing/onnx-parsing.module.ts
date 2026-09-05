import type { Module } from "@akasha/code-system/module"

export const onnxParsing = {
  id: "01a06d3b-743d-7534-a0c5-08148c804484",
  pageTypeSlug: "module",
  slug: "onnx-parsing",
  definition: "the parse a trained model gives for a text",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The model runs in this process rather than behind a socket.",
    },
    {
      invariantKind: "departure",
      statement: "The model is loaded once and kept for the life of the process.",
    },
    {
      invariantKind: "departure",
      statement: "The model files sit beside the parser model page.",
    },
    {
      invariantKind: "departure",
      statement: "A batch holds sixteen sentences unless the caller says otherwise.",
    },
    {
      invariantKind: "departure",
      statement: "A tensor is disposed of whether the run answers or throws.",
    },
    {
      invariantKind: "departure",
      statement: "A class the model does not name is read as the other class.",
    },
    {
      invariantKind: "absence",
      statement: "No process outside this one is started to parse a text.",
    },
    {
      invariantKind: "departure",
      statement: "A text parsed before is answered from the cache rather than by the model.",
    },
    {
      invariantKind: "departure",
      statement: "A text the model reads is written to the cache as a side effect of that reading.",
    },
  ],
} as const satisfies Module
