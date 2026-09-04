import type { Module } from "@akasha/code-system/module"

export const markdownDeriverHold = {
  id: "01a069d2-378e-7000-967f-74d3915b9d41",
  pageTypeSlug: "module",
  slug: "markdown-deriver-hold",
  definition: "the derivers a process keeps between reads, and the write that throws them away",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hold of zero keeps no deriver between one read and the next.",
    },
    {
      invariantKind: "departure",
      statement: "A deriver older than the hold is thrown away before one is handed back.",
    },
    {
      invariantKind: "departure",
      statement: "The rows of one page type are read once per deriver.",
    },
    {
      invariantKind: "constraint",
      statement: "Every reader of this cache shares the one instance the process loaded.",
    },
  ],
} as const satisfies Module
