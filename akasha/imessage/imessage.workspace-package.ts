import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const imessage = {
  id: "01a05bc9-4308-7007-a8cc-e8f6c025c81e",
  pageTypeSlug: "workspace-package",
  slug: "imessage",
  definition: "how Alan's iMessage history is read and how a message is handed to Messages",
  manifest: "json",
  partSlugs: [
    "module/imessage-host",
    "module/typedstream",
    "module/contacts-db",
    "module/chat-db",
    "module/imessage-remote",
    "module/imessage-send",
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
  ],
} as const satisfies WorkspacePackage
