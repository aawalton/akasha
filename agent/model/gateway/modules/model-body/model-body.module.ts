import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelBody = {
  id: "01a0a596-6b4f-7d38-aa50-16012c107a4a",
  type: "module",
  slug: "model-body",
  definition: "the model a request body names, read and written again",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the `model` key of a body is read here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that will not parse as json names no model.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body whose model is no string names no model.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An absent body names no model.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rewrite has every key the body has beside the model.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body naming no model is rewritten nowhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body already naming the model asked for is rewritten nowhere.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here names a model of its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here sends a request.",
    },
  ],
} as const satisfies Module
