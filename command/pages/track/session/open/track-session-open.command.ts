import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackSessionOpen = {
  id: "01a07979-7e12-70a2-94c9-93c43aec2949",
  type: "page-type/command",
  slug: "track-session-open",
  definition: "the command beginning a stretch on a day with none open",
  code: "ts",
  test: "ts",
  parts: [],

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An `open` begins a stretch where no stretch is open.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`open` reads `--at` as the time the stretch begins.",
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
  name: "open",
  arguments: [
    { argument: "argument/dry-run" },
    { argument: "argument/day" },
    { argument: "argument/safety" },
    { argument: "argument/difficulty" },
    { argument: "argument/title", required: true },
    { argument: "argument/at" },
    { argument: "argument/relationship", repeats: true },
  ],
} as const satisfies Command
