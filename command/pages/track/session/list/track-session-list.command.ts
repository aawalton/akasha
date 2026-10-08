import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackSessionList = {
  id: "01a07979-8035-7a44-ae7e-9077fced1824",
  type: "page-type/command",
  slug: "track-session-list",
  definition: "the command saying the stretches a day has",
  code: "ts",
  test: "ts",

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "`list` says each stretch's own id to a reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day is named at `--day`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here takes `--date`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "`list` writes nothing.",
    },
  ],
  name: "list",
  arguments: [{ argument: "argument/json" }, { argument: "argument/day" }],
  createdAt: "2026-09-07T01:26:40.949Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Command
