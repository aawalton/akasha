import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackSessionLog = {
  id: "01a07979-7efc-7ab9-ab22-d842668005c4",
  type: "page-type/command",
  slug: "track-session-log",
  definition: "the command writing a stretch that already began and ended",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `log` writes a stretch whose start and end are both said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`--start` names the time the stretch began.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`--end` names the time the stretch ended.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch cannot end at or before that stretch began.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows a day holds are sorted by when each began.",
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
      statement: "`--relationship` names a relationship by its id or by its title.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A title no relationship has is refused rather than written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A title more than one relationship has is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relationship a title tags is kept beside one `--relationship` names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An alias more than one relationship has tags neither and refuses nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An act that sets a title reads that title for aliases.",
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
  name: "log",
  arguments: [
    { argument: "argument/dry-run" },
    { argument: "argument/day" },
    { argument: "argument/safety" },
    { argument: "argument/difficulty" },
    { argument: "argument/title", required: true },
    { argument: "argument/stretch-start" },
    { argument: "argument/stretch-end", required: true },
    { argument: "argument/relationship", repeats: true },
  ],
} as const satisfies Command
