import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message7d3025e0a1b1 = {
  id: "01a0ba2c-72a3-7000-bbbb-7d3025e0a1b1",
  type: "page-type/message",
  slug: "message-7d3025e0a1b1",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "2 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- Spotify <no-reply@alerts.spotify.com> — 223009 - Your Spotify login code [everything-else]\n- Google <no-reply@accounts.google.com> — Security alert [google-other]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies Message
