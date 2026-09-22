import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armedTimer = {
  id: "01a090ab-acc0-7541-a3a9-a1241d1ee505",
  type: "page-type/module",
  slug: "armed-timer",
  definition: "the timeout a caller has pending, armed again or stopped",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The timers work is scheduled through are handed in so a test needs no wait.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At most one timeout is pending at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Arming again clears the timeout pending rather than adding a second one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reset restarts the whole span.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A timeout that fires is no longer pending before the caller's act runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stopped timer is stopped for good.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reset after a stop arms nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Stopping clears the timeout pending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a timer is stopped is answered to the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Arming again after a fire is the caller's own act rather than this module's.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows what the caller's act does.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No caller reaches the handle a timeout is held by.",
    },
  ],
} as const satisfies Module
