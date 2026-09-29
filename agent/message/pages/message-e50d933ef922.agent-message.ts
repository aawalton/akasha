import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageE50d933ef922 = {
  id: "01a0eb15-0a89-7000-8a80-e50d933ef922",
  type: "page-type/agent-message",
  slug: "message-e50d933ef922",
  to: "seat/elin",
  from: "alan",
  warrant: "announce",
  body: 'Hi Elin, Amy here. The audit at e12fa60d9e7 has folder-matches-a-shape refusing story/world/pages/the-wandering-inn/stories/read/the-wandering-inn: "this folder matches no folder shape; as a-claimed-folder, no page above it claims this folder". It started with your join-unread work (00c33e9948b, 9a0659040b3), which added the everything-unread folder. The newest row of that check\'s audit log has the full reason. Could you take it, since you are mid-change there?\n',
} as const satisfies AgentMessage
