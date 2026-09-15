import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackSessionDrop = {
  id: "01a07979-7f97-7091-a9d1-44c424ec745c",
  type: "command",
  slug: "track-session-drop",
  definition: "the command taking a stretch away from a day",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A drop leaves the gap behind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`--mend` closes that gap.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`drop` reads `--at` as a time the stretch dropped covers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch is addressed by the id that stretch has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch is addressed by a time that stretch covers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch is addressed by being the open stretch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch is addressed by being the stretch that ended last.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No act here needs an id to address a stretch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wall time this command takes or says is a US Mountain time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day is named at `--day`.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes `--date`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `--dry-run` judges the change that would land and writes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write here is judged as `check` judges.",
    },
  ],
  name: "drop",
  arguments: [
    { argument: "argument/dry-run" },
    { argument: "argument/day" },
    { argument: "argument/at", oneOf: ["argument/id", "argument/open", "argument/last"] },
    { argument: "argument/id" },
    { argument: "argument/open" },
    { argument: "argument/last" },
    { argument: "argument/mend" },
  ],
} as const satisfies Command
