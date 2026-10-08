import type { Command } from "akasha/command/command.page-type.types.ts"

export const emailDraftList = {
  id: "01a06810-cf11-711a-abf5-acd61e55baac",
  type: "page-type/command",
  slug: "email-draft-list",
  definition: "the command naming the id, message and thread of each draft in the mailbox",
  code: "ts",
  test: "ts",

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A draft is named by its own id rather than by the message that draft has.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a draft's body.",
    },
  ],
  name: "list",
  arguments: [{ argument: "argument/max" }],
  createdAt: "2026-09-03T16:18:47.185Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Command
