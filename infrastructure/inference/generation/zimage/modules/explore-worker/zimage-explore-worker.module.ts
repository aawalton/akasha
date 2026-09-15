import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zimageExploreWorker = {
  id: "01a06815-9efd-702c-97c4-1d8fa5c36f48",
  type: "module",
  slug: "zimage-explore-worker",
  definition: "a queue of prompt files rendered as each one arrives",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Work is added by writing a prompt file into the queue while the worker runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A prompt file taken out of the queue before that file is picked up is not rendered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A queue with nothing leaves the worker idling rather than ending that worker.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The worker ends when the stop file appears.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One render runs at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One inference runs at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt file may pin the seed with a leading line naming that seed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt file is claimed before that file is rendered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No retraction double-runs a claimed file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A render that fails is logged and not retried.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A lock file refuses a second worker over the same folder.",
    },
  ],
} as const satisfies Module
