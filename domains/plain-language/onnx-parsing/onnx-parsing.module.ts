import type { Module } from "@akasha/code/module"

export const onnxParsing = {
  id: "01a06d3b-743d-7534-a0c5-08148c804484",
  pageTypeSlug: "module",
  type: "module",
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
      statement: "A batch has sixteen sentences unless the caller says otherwise.",
    },
    {
      invariantKind: "departure",
      statement: "A sentence is parsed on a single thread unless the caller states a thread count.",
    },
    {
      invariantKind: "departure",
      statement: "The model runs slower across every core than on a single thread.",
    },
    {
      invariantKind: "departure",
      statement: "A thread beyond the first costs more time than that thread saves.",
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
      statement: "No process outside this process is started to parse a text.",
    },
    {
      invariantKind: "departure",
      statement: "A text parsed before is answered from the cache rather than by the model.",
    },
    {
      invariantKind: "departure",
      statement: "A text the model reads is written to the cache as a side effect of that reading.",
    },
    {
      invariantKind: "departure",
      statement: "A head's confidence is taken over the heads its own sentence offers.",
    },
    {
      invariantKind: "departure",
      statement: "The cache is keyed by the shape a parse has as well as by the model.",
    },
    {
      invariantKind: "departure",
      statement: "A parse stored under an earlier shape is read as no parse.",
    },
  ],
} as const satisfies Module
