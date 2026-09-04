import type { Module } from "@akasha/code-system/module"

export const fableFallback = {
  id: "01a0628b-a005-7a3c-a6f6-8e20462f3bb8",
  pageTypeSlug: "module",
  slug: "fable-fallback",
  definition: "whether a request body names a fable model",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A fable model name opens with `claude-fable-`.",
    },
    {
      invariantKind: "departure",
      statement: "A request body that is no JSON names no fable model.",
    },
    {
      invariantKind: "departure",
      statement: "A missing request body names no fable model.",
    },
    {
      invariantKind: "departure",
      statement: "The model name `claude-fable-` with nothing after names a fable model.",
    },
    {
      invariantKind: "departure",
      statement: "The prefix match is case sensitive.",
    },
    {
      invariantKind: "departure",
      statement: "A non-string `model` value names no fable model.",
    },
    {
      invariantKind: "departure",
      statement: "A body key beside `model` never refuses the parse.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here rewrites a request body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here throws.",
    },
  ],
} as const satisfies Module
