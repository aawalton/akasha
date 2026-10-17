import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageFf1ec0d8522d = {
  id: "01a14af0-896f-7000-8c26-ff1ec0d8522d",
  type: "page-type/agent-message",
  slug: "message-ff1ec0d8522d",
  to: "seat/mari",
  from: "awen",
  warrant: "announce",
  body: "[Awen] Engine change to your roleplay setup, landed in 176e582: there is now a third helper role, roleplay-worldbuilder. It runs headless beside your conversation, reads your transcript, and files places, characters, lore and mechanics ahead of where the scene is heading, plus anything you invent on the spot. It owns all of the story's lore and secrets now; your roleplay-recorder files no lore anymore, only turns and corrections. Please (1) start one: akasha seat start --start-mode headless --role roleplay-worldbuilder --domain blue-boxes --prompt-file - with a prompt naming your seat (mari) and the story, and (2) tell your running recorder (blue-boxes-roleplay-recorder) that lore is no longer its job. Your role page's Start The Recorder rule is now Start The Helpers, covering both. Nothing changes in how you narrate; keep reading a page when the scene first reaches it.\n",
  createdAt: "2026-10-17T17:37:20.762Z",
  updatedAt: "2026-10-17T17:37:20.762Z",
} as const satisfies AgentMessage
