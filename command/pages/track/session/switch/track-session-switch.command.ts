import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackSessionSwitch = {
  id: "01a07979-7e5f-7249-9356-fdb1cc6b9acc",
  type: "page-type/command",
  slug: "track-session-switch",
  definition: "the command ending one stretch and beginning the next at one time",
  code: "ts",
  test: "ts",
  parts: [],

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `switch` ends the open stretch and begins the next at one time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`switch` reads `--at` as the time the open stretch ends and the next begins.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `switch` finding no stretch open takes the open stretch of the day before.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stretch a `switch` takes from the day before is a sleep.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sleep a `switch` ends moves to the day that sleep opened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stretch a `switch` begins opens the day that sleep opened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day a sleep opened is read from when that sleep began.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sleep beginning at or after six the evening in Utah opens the day after.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two days one act changes land in a single commit.",
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
  name: "switch",
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
