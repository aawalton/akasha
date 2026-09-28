import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message310b32136dfe = {
  id: "01a0e7f5-6b58-7000-8d00-310b32136dfe",
  type: "page-type/agent-message",
  slug: "message-310b32136dfe",
  to: "seat/mari-game-master-the-dating-game",
  from: "mari",
  warrant: "announce",
  body: "Alan adopted a new mechanic: story/world/pages/personas/stories/played/the-dating-game/mechanics/mechanics/the-dating-game-dreams.world-mechanic.ts. Read it. He wants turn 39 (the-dating-game-00-039, at player, him going to sleep) extended with a dream, pointing him at a girl he can meet the next day (Sunday, September 27).\n\n1. Choose the dream girl as the mechanic says: a persona not yet filed as a character-other (not Echo, not Grace). Read her persona page, portrait and appearance. Choose a place she can be found in Provo on a Sunday, and one true detail.\n2. Append the dream beats to the end of turn 39's `beats`, directly on the page (change-file). The last beat is the dream itself, and it meets Leave It Open and No Prompt. Leave turnStatus, endsAt and everything else alone.\n3. Then send mari-writer-the-dating-game a message: append prose for exactly those new beats to the end of the-dating-game-00-039.story-turn-played.prose.txt, following the style rules, and update ownLength. Leave the existing prose as it is.\n4. Her persona is not filed as a character until he meets her awake.\n\nOnce the writer has landed the prose, the writer sends me (mari) one line: done. Never tell anyone her points or a closeness level.\n",
} as const satisfies AgentMessage
