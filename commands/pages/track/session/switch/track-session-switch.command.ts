import type { Command } from "../../../../command.page-type.ts"

export const trackSessionSwitch = {
  id: "01a07979-7e5f-7249-9356-fdb1cc6b9acc",
  pageTypeSlug: "command",
  type: "command",
  slug: "track-session-switch",
  definition: "the command ending one stretch and beginning the next at one time",
  code: "ts",
  changeKind: "change-mechanical",
  parts: ["module/waking"],
  taking: [
    { said: "--title <text>", takes: "what the next stretch is called" },
    { said: "--at <time>", takes: "the wall time the open stretch ends and the next begins" },
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
    "a sleep switch ends moves to the day it woke into, and the next stretch opens that day.",
    "--relationship names a relationship by its id or by its title.",
    "a title carrying one of a relationship's aliases tags the stretch with that relationship, with no flag said, and what --relationship names is kept beside it.",
    "an alias more than one relationship carries tags neither, and says nothing about it, since no act that writes stops to ask.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A `switch` ends the open stretch and begins the next at one time.",
    },
    {
      invariantKind: "departure",
      statement: "`switch` reads `--at` as the time the open stretch ends and the next begins.",
    },
    {
      invariantKind: "departure",
      statement: "A `switch` finding no stretch open takes the open stretch of the day before.",
    },
    {
      invariantKind: "departure",
      statement: "The stretch a `switch` takes from the day before is a sleep.",
    },
    {
      invariantKind: "departure",
      statement: "A sleep a `switch` ends moves to the day that sleep woke into.",
    },
    {
      invariantKind: "departure",
      statement: "The stretch a `switch` begins opens the day that sleep woke into.",
    },
    {
      invariantKind: "departure",
      statement: "The day a sleep woke into is named by the ESO reset at six in New York.",
    },
    {
      invariantKind: "departure",
      statement: "Two days one act changes land in a single commit.",
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
