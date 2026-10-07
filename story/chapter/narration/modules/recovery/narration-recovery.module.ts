import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationRecovery = {
  id: "01a111c2-21eb-76e4-8f9a-4d8209ace7cd",
  type: "page-type/module",
  slug: "narration-recovery",
  definition: "a stalled or broken narration brought back without Alan's help",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream that stalls is never paused by the player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stall of twenty seconds asks the stream again at the playhead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stall of two minutes or a broken stream reopens the narration from read progress.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reopen keeps the chapter's progress first and waits longer each time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bar says it is reconnecting while a reopen is under way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narration that three reopens could not bring back says why in the bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ten seconds heard after a reopen counts the narration as brought back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narration the speech workload answers 404 or 410 for is lost and reopened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A speech workload unreachable for twenty seconds breaks the narration too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The chapters asked for every few seconds find a lost narration with no media error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lost narration is reopened only while it plays, so a halt is never undone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A break while a reopen waits is the same break, so a burst of errors spends one try.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A narration lives only in the speech workload's memory, so its restart loses it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The phone keeps at least ten minutes of a narration downloaded past the playhead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Less held and nothing arriving asks the stream again, at most once a minute.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A playhead run dry ten seconds after asking again reopens the narration.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "iOS can stop downloading a stream and run dry without saying it is waiting.",
    },
  ],
} as const satisfies Module
