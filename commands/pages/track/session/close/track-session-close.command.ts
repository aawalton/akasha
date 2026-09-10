import type { Command } from "../../../../command.page-type.types.ts"

export const trackSessionClose = {
  id: "01a07979-7ead-77a5-955b-3cf604e934c7",
  pageTypeSlug: "command",
  type: "command",
  slug: "track-session-close",
  definition: "the command ending the open stretch of a day",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--at <time>", takes: "the wall time the stretch ends" },
    { said: "--day <date>", takes: "which day to act on, written as that day's own date" },
    { said: "--dry-run", takes: "judge what the act would land and write nothing" },
  ],
  helpNotes: [
    "every time said here is a US Mountain wall time, and no other clock is read or written.",
    "a day is named at --day and nowhere else.",
    "the day is left closed, so the next stretch is opened by a call of its own.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A `close` ends the open stretch.",
    },
    {
      invariantKind: "absence",
      statement: "A `close` begins no stretch.",
    },
    {
      invariantKind: "absence",
      statement: "A `close` moves no sleep.",
    },
    {
      invariantKind: "departure",
      statement: "`close` reads `--at` as the time the stretch ends.",
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
      statement: "A `--dry-run` judges the change that would land and writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A write here is judged as `check` judges.",
    },
  ],
} as const satisfies Command
