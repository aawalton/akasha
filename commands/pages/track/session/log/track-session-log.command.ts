import type { Command } from "../../../../command.page-type.ts"

export const trackSessionLog = {
  id: "01a07979-7efc-7ab9-ab22-d842668005c4",
  pageTypeSlug: "command",
  slug: "track-session-log",
  definition: "the command writing a stretch that already began and ended",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--title <text>", takes: "what the stretch is called" },
    { said: "--start <time>", takes: "the wall time the stretch began" },
    { said: "--end <time>", takes: "the wall time the stretch ended" },
    { said: "--day <date>", takes: "which day to act on, written as that day's own date" },
    {
      said: "--safety <level>",
      takes: "how safe Alan was over the stretch, from -2 to 5 in half steps",
    },
    {
      said: "--difficulty <level>",
      takes: "how hard the stretch was on him, from 0 to 5 in half steps",
    },
    {
      said: "--relationship <id|title>",
      takes: "who the stretch was with, said again or parted by commas for several",
    },
    { said: "--dry-run", takes: "judge what the act would land and write nothing" },
  ],
  helpNotes: [
    "every time said here is a US Mountain wall time, and no other clock is read or written.",
    "a day is named at --day and nowhere else.",
    "--relationship names a relationship by its id or by its title.",
    "a title carrying one of a relationship's aliases tags the stretch with that relationship, with no flag said, and what --relationship names is kept beside it.",
    "an alias more than one relationship carries tags neither, and says nothing about it, since no act that writes stops to ask.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A `log` writes a stretch whose start and end are both said.",
    },
    {
      invariantKind: "departure",
      statement: "`--start` names the time the stretch began.",
    },
    {
      invariantKind: "departure",
      statement: "`--end` names the time the stretch ended.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch cannot end at or before that stretch began.",
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
} as const satisfies Command
