import type { Module } from "../../../code-system/module/module.page-type.ts"

export const pageServing = {
  id: "01a05a0c-e821-77b9-8798-ffe359e087ba",
  pageTypeSlug: "module",
  slug: "page-serving",
  definition: "a question arriving over HTTP, and the answer sent back",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A question is asked at one path.",
    },
    {
      invariantKind: "departure",
      statement: "A question arrives by POST.",
    },
    {
      invariantKind: "departure",
      statement: "A question is a JSON object.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is a JSON object.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not parse is refused rather than read as an empty question.",
    },
    {
      invariantKind: "departure",
      statement: "A question naming no page type is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key holding what its shape does not allow is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says what was wrong with the question.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here listens.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "gap",
      statement: "A refusal says whose fault it was.",
    },
  ],
} as const satisfies Module
