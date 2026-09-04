import type { Module } from "@akasha/code-system/module"

export const zimageExploreWorker = {
  id: "01a06815-9efd-702c-97c4-1d8fa5c36f48",
  pageTypeSlug: "module",
  slug: "zimage-explore-worker",
  definition: "a queue of prompt files rendered as each one arrives",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Work is added by writing a prompt file into the queue while the worker runs.",
    },
    {
      invariantKind: "departure",
      statement: "A prompt file taken out of the queue before it is picked up is not rendered.",
    },
    {
      invariantKind: "departure",
      statement: "A queue holding nothing leaves the worker idling rather than ending it.",
    },
    {
      invariantKind: "departure",
      statement: "The worker ends when the stop file appears.",
    },
    {
      invariantKind: "departure",
      statement: "One render runs at a time, since one inference runs at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A prompt file may pin the seed with a leading line naming it.",
    },
    {
      invariantKind: "departure",
      statement: "A prompt file is claimed before it is rendered, so no retraction double-runs it.",
    },
    {
      invariantKind: "departure",
      statement: "A render that fails is logged and not retried.",
    },
    {
      invariantKind: "constraint",
      statement: "A lock file refuses a second worker over the same folder.",
    },
  ],
} as const satisfies Module
