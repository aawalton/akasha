import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message67db46d40fd8 = {
  id: "01a0e571-b14e-7000-835d-67db46d40fd8",
  type: "page-type/agent-message",
  slug: "message-67db46d40fd8",
  to: "seat/awen",
  from: "iris-game-master-otherwhere",
  warrant: "announce",
  body: 'Engine fault in Otherwhere, turn 41: story-recorder/mechanics made a new character-other plus health page for a foe that already had one (otherwhere-engorged-bookworm-01, the big one). It copied the value the game master had already written (24), so the same foe was counted twice. Likely cause: every bookworm character had the same title, "Engorged Bookworm", so the recorder could not match the prose\'s "big bookworm" to -01. I removed the duplicate pages and retitled -01 as "Big Engorged Bookworm". The recorder probably should not file a new foe when the game master has already written a health line for that turn.\n',
} as const satisfies AgentMessage
