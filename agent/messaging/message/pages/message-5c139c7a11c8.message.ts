import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message5c139c7a11c8 = {
  id: "01a0c9df-197c-7000-bc0a-5c139c7a11c8",
  type: "page-type/message",
  slug: "message-5c139c7a11c8",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "a run at ed43a0de289c7c914a6f405306361241ced0bfd4 over 1 check asked for by name found 1 check newly refusing.\n`relation-resolves` refused 24 times:\n  temper/catalog/gear/temper-armor-type/pages/chest.temper-armor-type.ts — states `valid-slots`, and `chest` names no page type, so which page it reaches is read off whoever asked\n  temper/catalog/gear/temper-armor-type/pages/feet.temper-armor-type.ts — states `valid-slots`, and `feet` names no page type, so which page it reaches is read off whoever asked\n  temper/catalog/gear/temper-armor-type/pages/hands.temper-armor-type.ts — states `valid-slots`, and `hands` names no page type, so which page it reaches is read off whoever asked\n  temper/catalog/gear/temper-armor-type/pages/head.temper-armor-type.ts — states `valid-slots`, and `head` names no page type, so which page it reaches is read off whoever asked\n  temper/catalog/gear/temper-armor-type/pages/legs.temper-armor-type.ts — states `valid-slots`, and `legs` names no page type, so which page it reaches is read off whoever asked\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
