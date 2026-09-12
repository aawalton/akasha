import type { Command } from "akasha/commands/command.page-type.types.ts"

export const trackSessionDrop = {
  id: "01a07979-7f97-7091-a9d1-44c424ec745c",
  type: "command",
  slug: "track-session-drop",
  definition: "the command taking a stretch away from a day",
  code: "ts",
  test: "ts",
  taking: [
    { said: "--open", takes: "the stretch to act on, which is the one that is open" },
    { said: "--last", takes: "the stretch to act on, which is the one that ended last" },
    { said: "--mend", takes: "close the gap a dropped stretch leaves behind" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A drop leaves the gap behind.",
    },
    {
      invariantKind: "departure",
      statement: "`--mend` closes that gap.",
    },
    {
      invariantKind: "departure",
      statement: "`drop` reads `--at` as a time the stretch dropped covers.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is addressed by the id that stretch has.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is addressed by a time that stretch covers.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is addressed by being the open stretch.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is addressed by being the stretch that ended last.",
    },
    {
      invariantKind: "absence",
      statement: "No act here needs an id to address a stretch.",
    },
    {
      invariantKind: "departure",
      statement: "A wall time this command takes or says is a US Mountain time.",
    },
    {
      invariantKind: "departure",
      statement: "A day is named at `--day`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes `--date`.",
    },
    {
      invariantKind: "departure",
      statement: "A `--dry-run` judges the change that would land and writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A write here is judged as `check` judges.",
    },
  ],
  name: "drop",
  arguments: [
    { argument: "argument/dry-run" },
    { argument: "argument/day" },
    { argument: "argument/at" },
    { argument: "argument/id" },
  ],
} as const satisfies Command
