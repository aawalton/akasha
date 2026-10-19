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
  ],
  createdAt: "2026-09-02T17:32:20.771Z",
  updatedAt: "2026-10-19T19:38:44.378Z",
} as const satisfies Module
