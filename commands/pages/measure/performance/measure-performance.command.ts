import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measurePerformance = {
  id: "01a08d46-74cc-7d0a-bdd8-5350a9662b53",
  type: "command",
  slug: "measure-performance",
  definition: "the command running one performance and saying what that performance measured",
  code: "ts",
  test: "ts",
  taking: [{ said: "<performance>", takes: "the slug of the one performance to run" }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One call runs one performance.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no performance is refused naming every performance there is.",
    },
    {
      invariantKind: "departure",
      statement: "The `measured` that code exports is what is called.",
    },
    {
      invariantKind: "absence",
      statement: "No ceiling on processor time holds a run here.",
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
  name: "performance",
} as const satisfies Command
