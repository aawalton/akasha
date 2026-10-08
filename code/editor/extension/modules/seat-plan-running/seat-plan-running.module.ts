import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatPlanRunning = {
  id: "01a0686b-bfe9-72a1-aae1-064e9d606367",
  type: "page-type/module",
  slug: "seat-plan-running",
  definition: "an act taken on a seat, from the row it was invoked on to the read that follows it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An act invoked on a row that is no seat does nothing, but for a stop on a section.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The plan is made from the state the row was drawn carrying.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt is shown as a modal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing runs while a prompt is open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anything but the confirming answer leaves the seat untouched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declined act is written to the output rather than passing silently.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The fleet is read again once the act is done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A section's stop takes its seats from the fleet last drawn, keyed by the section.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section's stop runs on each seat the plan a stop on that seat's own row runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section's stop runs on one seat at a time and reads the fleet once after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section with no seat running asks nothing and stops nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows the work a step does.",
    },
  ],
} as const satisfies Module
