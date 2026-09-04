import type { Command } from "@akasha/command-system/command"

export const emailDraftsList = {
  id: "01a06810-cf11-711a-abf5-acd61e55baac",
  pageTypeSlug: "command",
  slug: "email-drafts-list",
  definition: "the command naming the id, message and thread of each draft in the mailbox",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "--max <n>", takes: "how many drafts to answer with at most" }],
  helpNotes: [
    "a draft is named by its own id, the id of the message it holds, and the thread that message is in.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A draft is named by its own id rather than by the message it holds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a draft's body.",
    },
  ],
} as const satisfies Command
