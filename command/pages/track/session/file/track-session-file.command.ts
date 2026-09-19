import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackSessionFile = {
  id: "01a07979-8082-7e45-995c-fb8ebbddcda4",
  type: "page-type/command",
  slug: "track-session-file",
  definition: "the command taking a whole day in as written lines",
  code: "ts",
  test: "ts",
  parts: [],

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line handed to `file` opens with a wall time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title of the stretch follows that time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line closes with `s<safety>d<difficulty>`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line ends where the next line begins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last line of a set is left open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line saying no safety has the safety of the line above.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set of lines is judged whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set with one fault is refused whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set that is judged sound lands in a single commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--from-file` names the file the lines are read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--from-file` said as `-` reads the lines from standard input.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wall time this command takes or says is a US Mountain time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day is named at `--day`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here takes `--date`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--relationship` names a relationship by its id or by its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title no relationship has is refused rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title more than one relationship has is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship a title tags is kept beside one `--relationship` names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An alias more than one relationship has tags neither and refuses nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act that sets a title reads that title for aliases.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write here is judged as `check` judges.",
    },
  ],
  name: "file",
  arguments: [
    { argument: "argument/day" },
    { argument: "argument/from-file", required: true },
    { argument: "argument/relationship", repeats: true },
  ],
} as const satisfies Command
