import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackSessionCheck = {
  id: "01a07979-80d5-721b-946b-81f11c2413ab",
  type: "command",
  slug: "track-session-check",
  definition: "the command judging the rows a day carries",
  code: "ts",
  test: "ts",
  parts: [],

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "`check` refuses a line that is not JSON.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`check` refuses a key the row's own declaration does not carry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`check` refuses a key spelled in kebab.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`check` refuses an id that is no uuid version 7.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`check` refuses an id two rows of a day have.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`check` refuses a row naming a day no page has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`check` refuses a safety outside -2 to 5.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`check` refuses a difficulty outside 0 to 5.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`check` refuses a day with more than one open stretch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`check` reads a whole day rather than stopping at the first fault.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`check` judges no gap between two stretches.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`check` judges no overlap between two stretches.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`check` says nothing beyond its own refusals.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`check` writes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day is named at `--day`.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes `--date`.",
    },
  ],
  name: "check",
  arguments: [{ argument: "argument/day" }],
} as const satisfies Command
