import type { Command } from "../../../../command.page-type.ts"

export const trackSessionFile = {
  id: "01a07979-8082-7e45-995c-fb8ebbddcda4",
  pageTypeSlug: "command",
  slug: "track-session-file",
  definition: "the command taking a whole day in as written lines",
  code: "ts",
  changeKind: "change-mechanical",
  parts: ["module/day-landing"],
  taking: [
    {
      said: "--from-file <path|->",
      takes: "the day's lines, read from a file or from standard input",
    },
    { said: "--day <date>", takes: "which day to act on, written as that day's own date" },
    {
      said: "--relationship <id|title>",
      takes: "who the stretches were with, said again or parted by commas for several",
    },
    { said: "--dry-run", takes: "judge what the act would land and write nothing" },
  ],
  helpNotes: [
    "every time said here is a US Mountain wall time, and no other clock is read or written.",
    "a day is named at --day and nowhere else.",
    "a line handed to file opens with a wall time, carries the title next, and closes with the safety and the difficulty run together.",
    "each line handed to file ends where the line after it begins, and the last line of the set is left open.",
    "the lines handed to file are judged as a set and refused as a set, and a set that is sound lands as one commit.",
    "a line saying no safety carries the safety of the line above it.",
    "--relationship names a relationship by its id or by its title.",
    "a title carrying one of a relationship's aliases tags the stretch with that relationship, with no flag said, and what --relationship names is kept beside it.",
    "an alias more than one relationship carries tags neither, and says nothing about it, since no act that writes stops to ask.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line handed to `file` opens with a wall time.",
    },
    {
      invariantKind: "departure",
      statement: "The title of the stretch follows that time.",
    },
    {
      invariantKind: "departure",
      statement: "The line closes with `s<safety>d<difficulty>`.",
    },
    {
      invariantKind: "departure",
      statement: "A line ends where the next line begins.",
    },
    {
      invariantKind: "departure",
      statement: "The last line of a set is left open.",
    },
    {
      invariantKind: "departure",
      statement: "A line saying no safety has the safety of the line above.",
    },
    {
      invariantKind: "departure",
      statement: "A set of lines is judged whole.",
    },
    {
      invariantKind: "departure",
      statement: "A set with one fault is refused whole.",
    },
    {
      invariantKind: "departure",
      statement: "A set that is judged sound lands in a single commit.",
    },
    {
      invariantKind: "departure",
      statement: "`--from-file` names the file the lines are read from.",
    },
    {
      invariantKind: "departure",
      statement: "`--from-file` said as `-` reads the lines from standard input.",
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
