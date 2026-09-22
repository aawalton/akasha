import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libcMapping = {
  id: "01a0829f-d499-7794-b738-28a44c010e2e",
  type: "page-type/module",
  slug: "libc-mapping",
  definition: "the C library this process has mapped, named by its own mapped path",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The C library is named by the object this process already has mapped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name a loader would search for names no library here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mapping the loader has already deleted is named by the path that mapping came from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process with no C library mapped is refused rather than guessed at.",
    },
  ],
} as const satisfies Module
