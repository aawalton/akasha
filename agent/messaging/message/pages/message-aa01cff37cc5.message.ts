import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageAa01cff37cc5 = {
  id: "01a0bf5b-f978-7000-a488-aa01cff37cc5",
  type: "page-type/message",
  slug: "message-aa01cff37cc5",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at b15c54dadb1a1d6ed10671fd9edc24cbcd9978bb found 1 check newly refusing.\n`folder-matches-a-shape` refused 2 times:\n  story/world/stories/read/chapters — this folder matches no folder shape — as a-claimed-folder, no page above it claims this folder; as a-domain-with-its-parts, `story-chapter-read` is a page type, which has a shape of its own; as a-page-typ... (1315 characters more)\n  story/world/stories/read/chapters/story-chapter-read — this folder opens with `story-chapter-read`, what the page above it is named\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
