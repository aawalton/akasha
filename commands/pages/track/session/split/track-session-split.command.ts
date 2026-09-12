import type { Command } from "akasha/commands/command.page-type.types.ts"

export const trackSessionSplit = {
  id: "01a07979-7fe5-72fa-8982-e069a28c90c2",
  type: "command",
  slug: "track-session-split",
  definition: "the command parting one stretch into two at a time said",
  code: "ts",
  taking: [],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A `split` parts one stretch into two stretches at the time said.",
    },
    {
      invariantKind: "departure",
      statement: "`split` reads `--at` as the time the stretch is parted at.",
    },
    {
      invariantKind: "departure",
      statement: "A time falling outside the stretch parted is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Both halves a `split` makes have the relationships of the stretch parted.",
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
      statement: "`--relationship` names a relationship by its id or by its title.",
    },
    {
      invariantKind: "departure",
      statement: "A title no relationship has is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "A title more than one relationship has is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A relationship a title tags is kept beside one `--relationship` names.",
    },
    {
      invariantKind: "departure",
      statement: "An alias more than one relationship has tags neither and refuses nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An act that sets a title reads that title for aliases.",
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
  name: "split",
  arguments: [
    { argument: "argument/dry-run" },
    { argument: "argument/day" },
    { argument: "argument/at" },
    { argument: "argument/id" },
    { argument: "argument/open" },
    { argument: "argument/last" },
    { argument: "argument/title" },
    { argument: "argument/safety" },
    { argument: "argument/difficulty" },
    { argument: "argument/relationship" },
  ],
} as const satisfies Command
