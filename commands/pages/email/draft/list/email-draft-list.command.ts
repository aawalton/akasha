import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailDraftList = {
  id: "01a06810-cf11-711a-abf5-acd61e55baac",
  type: "command",
  slug: "email-draft-list",
  definition: "the command naming the id, message and thread of each draft in the mailbox",
  code: "ts",
  changeKind: "change-none",
  taking: [{ said: "--max <n>", takes: "how many drafts to answer with at most" }],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A draft is named by its own id rather than by the message that draft has.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a draft's body.",
    },
  ],
} as const satisfies Command
