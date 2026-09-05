import type { Module } from "@akasha/code-system/module"

export const moveSiding = {
  id: "01a07208-15d9-7ea4-b255-645f2d052aa0",
  pageTypeSlug: "module",
  slug: "move-siding",
  definition: "the pairs of paths a move carries, worked out from the pairs a call named",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pair is read against the repository root, and one side outside it is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A pair naming one path on both sides is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A source that is not there is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A source that is no file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A destination already holding a body is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path named as the source of more than one pair is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path named as the destination of more than one pair is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside what a pair names is carried without being named.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside what is named arrives in the folder that named file arrives in.",
    },
    {
      invariantKind: "departure",
      statement: "A file whose name reserves it uncommitted is answered as no commit carrying it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies Module
