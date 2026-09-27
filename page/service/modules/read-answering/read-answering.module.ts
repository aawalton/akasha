import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readAnswering = {
  id: "01a0e2ed-bc6b-78d5-8ecc-ec56df49e7a2",
  type: "page-type/module",
  slug: "read-answering",
  definition: "a question, a read, a shape or a file asked of the pages, and the answer sent back",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A question, a read, a shape and a file are reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read is answered as a status, a content type and a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A question hands back what its calculations read, and the caller keeps what was read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read answered on a reading thread is settled apart from every landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading thread takes the checkout's root from what started that thread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading thread tells the thread that started it its heap every ten seconds.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here imports code that writes, lands or follows.",
    },
  ],
} as const satisfies Module
