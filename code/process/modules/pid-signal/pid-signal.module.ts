import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pidSignal = {
  id: "01a05c4f-6f2e-7d2e-bf84-237cf8284bd3",
  type: "page-type/module",
  slug: "pid-signal",
  definition: "whether a process id still answers, read by signalling it with nothing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pid another user owns is a pid that is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only ESRCH proves a process is gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An errno that is neither ESRCH nor EPERM reads as unknown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every caller folds unknown its own way and says why in the fold.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The reading itself has no answer of alive or dead.",
    },
  ],
} as const satisfies Module
