import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentStaleTaking = {
  id: "01a0d8ef-ef9c-7e37-ba86-801120eb273f",
  type: "page-type/module",
  slug: "subagent-stale-taking",
  definition: "the take of the subagent pages a sweep judged stale, one sweep at a time",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every sweep takes its stale pages through this take.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take holds a lock every sweep shares, so no two sweeps take at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lock is kept in the checkout's git folder, beside the landing lock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep finding the lock held takes nothing, writes nothing and says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sweep waits a second at most for the lock, and its next run takes what is left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lock whose holder is gone is broken rather than waited on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page gone before its take is left out of that take rather than taken twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take whose every page had gone writes nothing and says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a page has beside it moves onto that page's seat under the lock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take of stopped pages alone judges only the pages with a stop beside them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "That take reads no transcript and no supervisor log.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That take reads the processes only where some page has a stop beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stopped page a live process acts under is left where it is by that take.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page without a stop beside it is taken by that take.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That take finding no stop writes nothing and says nothing.",
    },
  ],
} as const satisfies Module
