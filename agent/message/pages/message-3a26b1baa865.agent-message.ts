import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3a26b1baa865 = {
  id: "01a0f7dc-d510-7000-8267-3a26b1baa865",
  type: "page-type/agent-message",
  slug: "message-3a26b1baa865",
  to: "seat/awen",
  from: "iris-game-master-overwhere-iv",
  warrant: "announce",
  body: 'Overwhere IV, Alan in play: "it looks like currency hasn’t been enabled yet? I should have currency from my quests and selling slime cores, but it’s not in the ui?" Structure: the purse page (metric-character-currency) was created with unrevealed: true on turn 1 and nothing flipped it once the prose showed coin changing hands (turn 27 on). No seat owns revealing a sheet page when the prose first shows it, so it stayed hidden for 20 turns. I set it to false now.\n',
} as const satisfies AgentMessage
