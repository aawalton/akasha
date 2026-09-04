import type { Command } from "@akasha/command-system/command"

export const exerciseConstraintSet = {
  id: "01a0685c-7d81-7ff4-affa-100ab8f1b263",
  pageTypeSlug: "command",
  slug: "exercise-constraint-set",
  definition: "the command recording a standing limit or cue the coach programs within",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "--title <headline>",
      takes: "the headline of the constraint, which is what it is reached by",
    },
    { said: "--title-file <file>", takes: "a file the headline is read from" },
    { said: "--body <markdown>", takes: "what the constraint asks for, said in full" },
    { said: "--body-file <file>", takes: "a file what it asks for is read from" },
    { said: "--kind <kind>", takes: "what sort of limit or cue it is" },
    { said: "--focus <csv>", takes: "the focuses it reaches, parted by commas, or all of them" },
    { said: "--inactive", takes: "that the constraint is retired rather than standing" },
    { said: "--sort-order <n>", takes: "where it sits when the constraints are read as a list" },
    { said: "--json", takes: "answer as JSON rather than as a line meant for a reader" },
  ],
  helpNotes: [
    "the first call on a headline makes the page and every later call changes the one that stands.",
    "a field the call does not name is left as it was.",
    "what the constraint asks for lands in a file beside the page rather than in the page.",
    "a constraint stands unless `--inactive` is said.",
    "a constraint tagged all reaches every focus, so it needs no other tag.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A constraint is reached by its headline.",
    },
    {
      invariantKind: "departure",
      statement: "What a constraint asks for stands in its own file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A field the call does not name is left as it was.",
    },
    {
      invariantKind: "departure",
      statement: "A constraint made by this call stands unless the call says otherwise.",
    },
  ],
} as const satisfies Command
