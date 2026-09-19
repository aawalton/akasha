import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const syncing = {
  id: "01a0686a-7a57-76d6-a2df-a5aa6fbe7d58",
  type: "page-type/module",
  slug: "syncing",
  definition: "every chapter the wandering inn lists read and filed under the story",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The story the chapters are filed under is there before any chapter is read.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter marked as patron early access by its title or by its page body is left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter with no prose once the trailing navigation is stripped is left rather than filed empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's title is the page's own title where the page has a title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's title is the contents listing's title where the page has no title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second sits between one chapter read and the next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The site is closed whether the run finished or threw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter that failed is counted and the run carries on to the next chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that files nothing is still recorded as a run that happened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that only says the chapters the run would file is not recorded as a run.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the page store over the network.",
    },
  ],
} as const satisfies Module
