import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message73d0dd2b4b0b = {
  id: "01a0a647-0a96-7000-94a6-73d0dd2b4b0b",
  type: "page-type/message",
  slug: "message-73d0dd2b4b0b",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at f6a998efe7aab484b59442b707a3aa496a802a8f found 1 check newly refusing.\n`file-is-owned-by-a-page` refused 1 time:\n  agent/seat/pages/akasha/akasha.seat.edits.uncommitted.jsonl.lock/held-by — belongs to no page, so nothing says what this file is for\n/var/home/walton/.local/state/workstation-services/audit-verdicts.json holds what each of them answered, whole.\n",
} as const satisfies Message
