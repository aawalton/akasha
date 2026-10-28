import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageFe61a998e0cc = {
  id: "01a1838b-689a-714e-9aa5-fe61a998e0cc",
  type: "page-type/agent-message",
  slug: "message-fe61a998e0cc",
  to: "seat/awen",
  from: "awen",
  warrant: "announce",
  body: "Achievement naming is live (6b34a34, deployed at 00d2df8; looked at gifted-reborn at 1440 and 390, no clicks). A world now names what it calls a title (new world property title-name, 77b373a); Gifted says Achievement. Title windows read ACHIEVEMENT ACQUIRED in Gifted, and narration says 'Achievement earned: …' (tested). A world naming none falls back to Title: the card reads TITLE ACQUIRED (it read plain TITLE before) and narration still says 'Title earned'. test-story's prose has no title window, so I couldn't show its card on screen. Only the singular is stored: nothing shows the plural, since the sheet lists titles under the name with no label or section. No GM aid or step instruction calls these Titles, so nothing there needed changing.\n",
  createdAt: "2026-10-28T17:25:14.404Z",
  updatedAt: "2026-10-28T17:25:14.404Z",
} as const satisfies AgentMessage
