import type { Command } from "akasha/command/command.page-type.types.ts"

export const measurePerformance = {
  id: "01a08d46-74cc-7d0a-bdd8-5350a9662b53",
  type: "page-type/command",
  slug: "measure-performance",
  definition: "the command running a performance and saying what that performance measured",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One call runs one performance.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no performance is refused naming every performance there is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The `measured` that code exports is what is called.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No ceiling on processor time holds a run here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A performance is named by its slug rather than by its path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code beside a performance page is what runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A performance whose code exports no `measured` is refused rather than run.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges a figure against a limit.",
    },
  ],
  name: "performance",
  arguments: [{ argument: "argument/performance", required: true, saidAs: "word" }],
} as const satisfies Command
