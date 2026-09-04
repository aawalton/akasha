import type { Module } from "@akasha/code-system/module"

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
      statement: "A test named outside the vocabulary is refused by the name that test was given.",
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
      statement: "A read is handed in at a path of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A read carrying neither a path nor a page is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An answer to a read names the commit its bodies were read at.",
    },
    {
      invariantKind: "departure",
      statement: "A write is handed in at a path of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A write may state the commit that write read as a string.",
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
      statement: "A write may carry pages rather than bodies.",
    },
    {
      invariantKind: "departure",
      statement: "A page a write carries names its page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page a write carries names its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A page a write carries states its values.",
    },
    {
      invariantKind: "departure",
      statement: "A page a write carries may say whether it merges.",
    },
    {
      invariantKind: "departure",
      statement: "A page a write carries states nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "A page a write carries is composed into a body before the write is handed on.",
    },
    {
      invariantKind: "departure",
      statement: "A page that will not compose refuses the write.",
    },
    {
      invariantKind: "departure",
      statement: "An answer to a write names the commit that write landed as.",
    },
    {
      invariantKind: "departure",
      statement: "A shape is asked for at a path of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A shape asked for naming no page type is refused.",
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
