import type { Module } from "@akasha/code/module"

export const judgedBody = {
  id: "01a08213-3429-7031-8838-a0ae7833cf8f",
  pageTypeSlug: "module",
  type: "module",
  slug: "judged-body",
  definition: "the body a check judges, made from text",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body a check judges is made from text here rather than by each caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
