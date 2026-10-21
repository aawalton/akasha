import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersEventsBuild = {
  id: "01a0632d-cba3-7016-85c9-1835035387d2",
  type: "page-type/module",
  slug: "characters-events-build",
  definition: "what this add-on does when the played character's build changes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of build changes is read once after the run settles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A swap of bars is a build change, so the bar now held gets its reported stats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build change read while the character sheet is open works its values out again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each load of the character takes the whole build capture, reported stats with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A buff the player gains or loses is a build change, so food, drink and mundus each land a reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff the player already has being refreshed or restacked is no build change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change to a buff on the player is handed on to be noted where it is Fete.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change to a buff on the player is handed on to note the power it began with.",
    },
  ],
  createdAt: "2026-09-02T17:32:20.771Z",
  updatedAt: "2026-10-21T04:05:39.502Z",
} as const satisfies Module
