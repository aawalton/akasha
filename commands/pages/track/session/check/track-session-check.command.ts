import type { Command } from "../../../../command.page-type.types.ts"

export const trackSessionCheck = {
  id: "01a07979-80d5-721b-946b-81f11c2413ab",
  pageTypeSlug: "command",
  type: "command",
  slug: "track-session-check",
  definition: "the command judging the rows a day carries",
  code: "ts",
  changeKind: "change-mechanical",
  parts: ["module/session-rows"],
  taking: [{ said: "--day <date>", takes: "which day to act on, written as that day's own date" }],
  helpNotes: [
    "a day is named at --day and nowhere else.",
    "check judges a day by what every act that writes is judged by, and it writes nothing itself.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "`check` refuses a line that is not JSON.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses a key the row's own declaration does not carry.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses a key spelled in kebab.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses an id that is no uuid version 7.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses an id two rows of a day have.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses a row naming a day no page has.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses a safety outside -2 to 5.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses a difficulty outside 0 to 5.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses a day with more than one open stretch.",
    },
    {
      invariantKind: "departure",
      statement: "`check` reads a whole day rather than stopping at the first fault.",
    },
    {
      invariantKind: "absence",
      statement: "`check` judges no gap between two stretches.",
    },
    {
      invariantKind: "absence",
      statement: "`check` judges no overlap between two stretches.",
    },
    {
      invariantKind: "absence",
      statement: "`check` says nothing beyond its own refusals.",
    },
    {
      invariantKind: "absence",
      statement: "`check` writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A day is named at `--day`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes `--date`.",
    },
  ],
} as const satisfies Command
