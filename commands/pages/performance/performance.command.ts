import type { Command } from "../../command.page-type.ts"

export const performance = {
  id: "01a08788-54c2-76bf-801e-e29fd3f5aa9a",
  pageTypeSlug: "command",
  slug: "performance",
  definition: "the command running one performance and saying what that performance measured",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  taking: [{ said: "<performance>", takes: "the slug of the one performance to run" }],
  helpNotes: [
    "one call runs one performance.",
    "a call naming no performance is refused with every performance there is.",
    "the code beside the performance page is what runs, and its `measured` is what is called.",
    "a run is under no ceiling on processor time, so a performance may take as long as it takes.",
    "an answer is figures rather than a verdict, so nothing here refuses a performance for being slow.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One call runs one performance.",
    },
    {
      invariantKind: "departure",
      statement: "A performance is named by its slug rather than by its path.",
    },
    {
      invariantKind: "departure",
      statement: "The code beside a performance page is what runs.",
    },
    {
      invariantKind: "departure",
      statement: "A performance whose code exports no `measured` is refused rather than run.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a figure against a limit.",
    },
  ],
} as const satisfies Command
