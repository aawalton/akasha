import type { Command } from "../../../../command.page-type.ts"

export const measureClaudeAccountsCost = {
  id: "01a0796e-60fd-789e-af7f-3c8104ab8bb3",
  pageTypeSlug: "command",
  type: "command",
  slug: "measure-claude-accounts-cost",
  definition: "the command pricing the calls the transcripts on this machine have",
  code: "ts",
  changeKind: "change-mechanical",
  parts: ["module/claude-account-costing"],
  taking: [],
  helpNotes: [
    "the calls priced are the ones the transcripts on this machine hold over the last thirty days.",
    "a price is the api's own list price, so what a subscription cost is not what this says.",
    "a call a resumed session or a subagent wrote down again is counted once.",
    "the transcripts sit on this machine, so calls made on another machine are not counted.",
    "a model this holds no price for is named under the total rather than counted as nothing.",
    "every transcript is read, which takes minutes, and nothing is written while it runs.",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
  ],
} as const satisfies Command
