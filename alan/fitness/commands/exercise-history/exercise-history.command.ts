import type { Command } from "@akasha/command-system/command"

export const exerciseHistory = {
  id: "01a0685c-7d81-7267-a237-963c120bfc20",
  pageTypeSlug: "command",
  slug: "exercise-history",
  definition: "the command saying what Alan has lately done on one movement and the best of it",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<exercise>", takes: "the movement to read, named as the first word" },
    {
      said: "--exercise <ref>",
      takes: "the movement to read, named by id, by slug, by title or by part of one",
    },
    { said: "--limit <n>", takes: "how many sets to fetch, newest first" },
    { said: "--json", takes: "answer as JSON rather than as lines meant for a reader" },
  ],
  helpNotes: [
    "the movement is named as the first word or at `--exercise`, and either does the same thing.",
    "a name matching more than one movement is refused with the candidates said, so no call guesses.",
    "the sets come back newest first, each with the day its session fell on.",
    "the best set is the heaviest of the sets fetched, and the most reps at that weight breaks a tie.",
    "the best is the best of what was fetched rather than of the whole history, so a wider `--limit` may find a better one.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A set takes its day from the session it was logged into.",
    },
    {
      invariantKind: "departure",
      statement: "A set carrying no weight is no candidate for the best.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Command
