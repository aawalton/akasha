import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageF3e3409a69fc = {
  id: "01a0c161-fed7-7000-b572-f3e3409a69fc",
  type: "page-type/message",
  slug: "message-f3e3409a69fc",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 667f66109903ad6e7c82f76e6c4d0572417e9b23 found 1 check newly refusing.\n`manifest-names-what-is-reached` refused 2 times:\n  package.json — names `@supabase/ssr` under `dependencies`, which nothing it holds reaches — a manifest names what its own package reaches and nothing besides\n  package.json — names `cookie` under `dependencies`, which nothing it holds reaches — a manifest names what its own package reaches and nothing besides\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
