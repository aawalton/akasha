import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fableFallback = {
  id: "01a0628b-a005-7a3c-a6f6-8e20462f3bb8",
  type: "page-type/module",
  slug: "fable-fallback",
  definition: "whether a request body names a fable model",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A fable model name opens with `claude-fable-`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request body that is no JSON names no fable model.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A missing request body names no fable model.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The model name `claude-fable-` with nothing after names a fable model.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The prefix match is case sensitive.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A non-string `model` value names no fable model.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body key beside `model` never refuses the parse.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here rewrites a request body.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here throws.",
    },
  ],
} as const satisfies Module
