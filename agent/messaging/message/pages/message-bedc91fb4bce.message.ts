import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageBedc91fb4bce = {
  id: "01a0c4ad-394a-7000-8bc0-bedc91fb4bce",
  type: "page-type/message",
  slug: "message-bedc91fb4bce",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at cb68f919a8272455d62bfa92c1c8456bafc0d6e2 found 2 checks newly refusing.\n`folder-matches-a-shape` refused 2 times:\n  story/world/stories/read/chapters — this folder matches no folder shape — as a-claimed-folder, no page above it claims this folder; as a-domain-with-its-parts, `story-chapter-read` is a page type, which has a shape of its own; as a-page-typ... (1315 characters more)\n  story/world/stories/read/chapters/story-chapter-read — this folder opens with `story-chapter-read`, what the page above it is named\n`tests-pass` refused 1 time:\n  alan/harness/email-watch/modules/email-rule-reading/email-rule-reading.module.test.ts — Measured between 2026-09-21T15:52:38.326Z and 2026-09-21T15:53:50.994Z. 4 test files failed: alan/harness/email-watch/modules/email-rule-reading/email-r... (2754 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
