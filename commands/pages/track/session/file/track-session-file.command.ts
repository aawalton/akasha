import type { Command } from "akasha/commands/command.page-type.types.ts"

export const trackSessionFile = {
  id: "01a07979-8082-7e45-995c-fb8ebbddcda4",
  type: "command",
  slug: "track-session-file",
  definition: "the command taking a whole day in as written lines",
  code: "ts",
  parts: [],
  taking: [
    {
      said: "--from-file <path|->",
      takes: "the day's lines, read from a file or from standard input",
    },
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
  name: "file",
  arguments: [
    { argument: "argument/dry-run" },
    { argument: "argument/day" },
    { argument: "argument/relationship" },
  ],
} as const satisfies Command
