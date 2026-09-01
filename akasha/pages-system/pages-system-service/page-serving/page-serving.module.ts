import type { Module } from "../../../code-system/module/module.page-type.ts"

export const pageServing = {
  id: "01a05a0c-e821-77b9-8798-ffe359e087ba",
  pageTypeSlug: "module",
  slug: "page-serving",
  definition: "a question or a write arriving over HTTP, and the answer sent back",
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
      statement: "A test named outside the vocabulary is refused by the name it was given.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal over a test names the key the test stands on.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says what was wrong with the question.",
    },
    {
      invariantKind: "departure",
      statement: "A write is handed in at a path of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A write stating no writer is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A write stating no message is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An answer to a write names the commit it landed as.",
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
