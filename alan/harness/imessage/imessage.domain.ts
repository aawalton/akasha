import type { Domain } from "../../../domains/domain.page-type.ts"

export const imessage = {
  id: "01a05bc9-4308-7007-a8cc-e8f6c025c81e",
  pageTypeSlug: "domain",
  slug: "imessage",
  definition: "how Alan's iMessage history is read and how a message is handed to Messages",
  parts: [
    "module/imessage-host",
    "module/typedstream",
    "module/contacts-db",
    "module/chat-db",
    "module/imessage-remote",
    "module/imessage-send",
    "module/message-lines",
    "module/imessage-command-reading",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No message body is written to a page or a log from here.",
    },
    {
      invariantKind: "departure",
      statement: "Every read and every send happens on a mac reached over ssh.",
    },
    {
      invariantKind: "departure",
      statement: "The message store is queried through sqlite3 on that mac.",
    },
    {
      invariantKind: "departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
  ],
} as const satisfies Domain
