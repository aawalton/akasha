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
      statement: "A read answered on a reading thread is kept apart from every landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading thread takes the checkout's root from what started that thread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question is wide where its page type holds more than twenty thousand pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the reading thread started as the lane answers a wide question.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other reading thread hands a wide question back unanswered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lane lets go of what a wide question held as soon as it has answered.",
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
