import type { Module } from "@akasha/code-system/module"

export const pipelineAnswering = {
  id: "01a06810-9439-771b-aef2-4b3f4fae2029",
  pageTypeSlug: "module",
  slug: "pipeline-answering",
  definition: "the words a pipeline command was called with, read, and the answer built from them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag naming a value takes the word after it.",
    },
    {
      invariantKind: "departure",
      statement: "A word opening with a dash is never read as a value.",
    },
    {
      invariantKind: "departure",
      statement: "A flag no command names is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Every word a caller got wrong is named rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "A seq is a whole number at or above zero.",
    },
    {
      invariantKind: "departure",
      statement: "A word that is no seq is the caller's mistake rather than the data's.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carrying a code of its own is answered with that code.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carrying no code of its own is answered as operational.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page or reaches a cluster.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here prints.",
    },
  ],
} as const satisfies Module
