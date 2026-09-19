import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackSessionDrop = {
  id: "01a07979-7f97-7091-a9d1-44c424ec745c",
  type: "page-type/command",
  slug: "track-session-drop",
  definition: "the command taking a stretch away from a day",
  code: "ts",
  test: "ts",

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A drop leaves the gap behind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--mend` closes that gap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`drop` reads `--at` as a time the stretch dropped covers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch is addressed by the id that stretch has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch is addressed by a time that stretch covers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch is addressed by being the open stretch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch is addressed by being the stretch that ended last.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No act here needs an id to address a stretch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wall time this command takes or says is a US Mountain time.",
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
      decisionKind: "decision-kind/departure",
      statement: "A write here is judged as `check` judges.",
    },
  ],
  name: "drop",
  arguments: [
    { argument: "argument/day" },
    { argument: "argument/at", oneOf: ["argument/id", "argument/open", "argument/last"] },
    { argument: "argument/id" },
    { argument: "argument/open" },
    { argument: "argument/last" },
    { argument: "argument/mend" },
  ],
} as const satisfies Command
