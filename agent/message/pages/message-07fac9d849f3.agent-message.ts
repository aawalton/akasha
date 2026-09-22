import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message07fac9d849f3 = {
  id: "01a0ca55-d469-7000-b75b-07fac9d849f3",
  type: "page-type/agent-message",
  slug: "message-07fac9d849f3",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at ddd8c837ff45cffe8aabb998fe5d4bd158d431ca found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 15 times:\n  world/pages/personas/stories/played/the-tower/characters/the-tower-ashling-01.character-other.referenced-by — the index entry for this file is in the index differing from what its page says\n  world/pages/personas/stories/played/the-tower/characters/the-tower-companion-aelwyn.character-other.referenced-by — the index entry for this file is in the index differing from what its page says\n  world/pages/personas/stories/played/the-tower/characters/the-tower-companion-ali.character-other.referenced-by — the index entry for this file is in the index differing from what its page says\n  world/pages/personas/stories/played/the-tower/characters/the-tower-companion-aura.character-other.referenced-by — the index entry for this file is in the index differing from what its page says\n  world/pages/personas/stories/played/the-tower/characters/the-tower-counterweight-colossus-01.character-other.referenced-by — the index entry for this file is in the index differing from what its page says\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies AgentMessage
