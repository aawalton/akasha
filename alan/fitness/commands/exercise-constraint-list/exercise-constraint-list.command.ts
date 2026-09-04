import type { Command } from "@akasha/command-system/command"

export const exerciseConstraintList = {
  id: "01a0685c-7d81-7770-97be-b5537af014cd",
  pageTypeSlug: "command",
  slug: "exercise-constraint-list",
  definition: "the command saying which coaching constraints stand over Alan's training",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--focus <focus>",
      takes: "the focus to keep, which is one training focus or all of them",
    },
    { said: "--all", takes: "the retired constraints as well as the standing ones" },
    { said: "--json", takes: "answer as JSON rather than as lines meant for a reader" },
  ],
  helpNotes: [
    "a constraint tagged for all focuses is kept whichever focus is named.",
    "a retired constraint is left out unless `--all` is said.",
    "the constraints come back in the order they are meant to be read in.",
    "a line carries the kind, then the focuses, then the headline.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A constraint tagged for every focus answers to each of them.",
    },
    {
      invariantKind: "departure",
      statement: "A constraint saying nothing about whether it stands is taken as standing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Command
