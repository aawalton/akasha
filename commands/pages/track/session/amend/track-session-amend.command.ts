import type { Command } from "akasha/commands/command.page-type.types.ts"

export const trackSessionAmend = {
  id: "01a07979-7f49-7026-ba5c-99f1601920f2",
  type: "command",
  slug: "track-session-amend",
  definition: "the command changing a stretch already written",
  code: "ts",
  parts: [],
  taking: [
    {
      said: "--difficulty <level>",
      takes: "how hard the stretch was on him, from 0 to 5 in half steps",
    },
    {
      said: "--relationship <id|title>",
      takes: "who the stretch was with, said again or parted by commas for several",
    },
  ],

  invariants: [
    {
      invariantKind: "gap",
      statement: "An amend moves no stretch on either side of the stretch amended.",
    },
    {
      invariantKind: "departure",
      statement: "An `amend` replaces a stretch's relationships rather than adding to the stretch.",
    },
    {
      invariantKind: "departure",
      statement: "`amend` reads `--at` as a time the stretch amended covers.",
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
  name: "amend",
  arguments: [
    { argument: "argument/dry-run" },
    { argument: "argument/day" },
    { argument: "argument/at" },
    { argument: "argument/id" },
    { argument: "argument/open" },
    { argument: "argument/last" },
    { argument: "argument/title" },
    { argument: "argument/safety" },
  ],
} as const satisfies Command
