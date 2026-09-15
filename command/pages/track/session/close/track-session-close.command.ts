import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackSessionClose = {
  id: "01a07979-7ead-77a5-955b-3cf604e934c7",
  type: "page-type/command",
  slug: "track-session-close",
  definition: "the command ending the open stretch of a day",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `close` ends the open stretch.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A `close` begins no stretch.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A `close` moves no sleep.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`close` reads `--at` as the time the stretch ends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wall time this command takes or says is a US Mountain time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day is named at `--day`.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes `--date`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `--dry-run` judges the change that would land and writes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write here is judged as `check` judges.",
    },
  ],
  name: "close",
  arguments: [
    { argument: "argument/dry-run" },
    { argument: "argument/day" },
    { argument: "argument/at" },
  ],
} as const satisfies Command
