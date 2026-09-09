import type { Command } from "../../../command.page-type.ts"

export const trackWeight = {
  id: "01a07bfe-36da-7166-8f06-6fa75c6f8c29",
  pageTypeSlug: "command",
  type: "command",
  slug: "track-weight",
  definition: "the command recording what Alan's body weighed on a day",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--bodyweight <lb>", takes: "what Alan's body weighed, in pounds" },
    { said: "--day <date>", takes: "which day to act on, written as that day's own date" },
  ],
  helpNotes: [
    "a day is named at --day and nowhere else.",
    "a call naming no day acts on the US Mountain day, as akasha track session reads one.",
    "a weight the day already carries is replaced rather than kept beside the weight said here.",
    "the weight the exercise coach counts volume against is the one Alan's person page carries rather than this one.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day has the weight measured on that day.",
    },
    {
      invariantKind: "departure",
      statement: "A weight is written in pounds.",
    },
    {
      invariantKind: "departure",
      statement: "A weight a day already has is replaced.",
    },
    {
      invariantKind: "departure",
      statement: "A weight that reads as no number is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A weight at or below nothing is refused.",
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
      statement: "A day with no page is written before the weight goes onto that day.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the weight onto Alan's person page.",
    },
  ],
} as const satisfies Command
