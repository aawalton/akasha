import type { Command } from "akasha/command/command.page-type.types.ts"

export const plaidCheck = {
  id: "01a15487-8caa-7be3-89db-3e254628efb8",
  type: "page-type/command",
  slug: "plaid-check",
  definition: "the command naming the posted rows of a linked bank that Monarch lacks",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bank is named by the slug of its plaid-item page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Plaid's keys are read from the sops file beside that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only posted rows are weighed, in Plaid and in Monarch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Monarch rows on every account are weighed against each Plaid row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Plaid row matches a Monarch row of the opposite amount to the cent within three days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each row matches at most one row, and the pairs nearest in days are taken first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names each Plaid row Monarch lacks, then how many there are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An amount is said with Monarch's sign, so spending is negative.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to Monarch or to Plaid.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here prints a key.",
    },
  ],
  name: "check",
  arguments: [
    { argument: "argument/plaid-item", required: true, saidAs: "word" },
    { argument: "argument/first-day" },
  ],
  createdAt: "2026-10-19T14:18:51.946Z",
  updatedAt: "2026-10-19T14:18:51.946Z",
} as const satisfies Command
