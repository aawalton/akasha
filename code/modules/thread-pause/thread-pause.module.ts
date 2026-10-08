import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const threadPause = {
  id: "01a08e0b-3619-7b50-b734-15e0787219e1",
  type: "page-type/module",
  slug: "thread-pause",
  definition: "the thread held still for a number of milliseconds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The wait reaches no `Bun` global.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The thread is held rather than a later turn taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "How long a caller waits in all is bounded by that caller.",
    },
  ],
  createdAt: "2026-09-11T01:18:14.553Z",
  updatedAt: "2026-09-15T19:24:53.000Z",
} as const satisfies Module
