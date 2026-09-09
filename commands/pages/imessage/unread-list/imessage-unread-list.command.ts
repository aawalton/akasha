import type { Command } from "../../../command.page-type.ts"

export const imessageUnreadList = {
  id: "01a0685f-c8ed-7005-84fd-d9365b175452",
  pageTypeSlug: "command",
  slug: "imessage-unread-list",
  definition: "the command giving back the unread messages that came to Alan",
  code: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--contact <name-or-handle>",
      takes: "hold the answer to the conversations of the one contact named",
    },
    { said: "--limit <n>", takes: "the most messages given back, all of them where none is said" },
    { said: "--tail <n>", takes: "the same thing said the other way" },
    { said: "--json", takes: "give the messages as JSON rather than as tab-parted rows" },
  ],
  helpNotes: [
    "unread counts what came in, was never read, was not sent by Alan, and was carried to his own number.",
    "the window is the last thirty days, so an older unread message is no longer counted.",
    "saying no limit answers every unread message, so the number of rows is the unread count.",
    "a row carries the moment, the sender, and the text; a short code sender stays the code.",
    "a named group chat carries its display name before the sender.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Unread counts only messages carried to Alan's own number within thirty days.",
    },
    {
      invariantKind: "departure",
      statement: "Saying no limit answers every unread message rather than a capped list.",
    },
    {
      invariantKind: "departure",
      statement: "A handle no contact names is answered as the handle itself.",
    },
    {
      invariantKind: "departure",
      statement: "The messages are answered oldest first.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here marks a message read.",
    },
  ],
} as const satisfies Command
