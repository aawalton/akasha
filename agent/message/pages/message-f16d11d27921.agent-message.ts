import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF16d11d27921 = {
  id: "01a17f1d-7dd1-7403-ad1c-f16d11d27921",
  type: "page-type/agent-message",
  slug: "message-f16d11d27921",
  to: "seat/alan",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at c5a164064ef5e018b34d7ead3013144191b14108 found 2 checks newly refusing.\n`index-is-level-with-the-pages` refused 1 time:\n  world/stories/played/difficulty-levels/pages/hard.difficulty-level.referenced-by — the index entry for this file is in the index differing from what its page says\n`relation-resolves` refused 22 times:\n  alan/track/to-do/pages/bring-in-trash-cans/bring-in-trash-cans.to-do.ts — states `difficulty`, and `light` names no page type, so which page it reaches is read off whoever asked\n  alan/track/to-do/pages/brush-floss/brush-floss.to-do.ts — states `difficulty`, and `trivial` names no page type, so which page it reaches is read off whoever asked\n  alan/track/to-do/pages/call-provider-for-medication-refill/call-provider-for-medication-refill.to-do.ts — states `difficulty`, and `hard` names no page type, so which page it reaches is read off whoever asked\n  alan/track/to-do/pages/clean-office/clean-office.to-do.ts — states `difficulty`, and `light` names no page type, so which page it reaches is read off whoever asked\n  alan/track/to-do/pages/clean-toilet/clean-toilet.to-do.ts — states `difficulty`, and `hard` names no page type, so which page it reaches is read off whoever asked\nwhat each of them answered is on the newest row of the audit log beside that check's page. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
  createdAt: "2026-10-27T20:46:42.045Z",
  updatedAt: "2026-10-27T20:46:42.045Z",
} as const satisfies AgentMessage
