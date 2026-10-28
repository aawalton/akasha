import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message6ef369c65d01 = {
  id: "01a17fd2-049c-7353-9b4b-6ef369c65d01",
  type: "page-type/agent-message",
  slug: "message-6ef369c65d01",
  to: "seat/awen",
  from: "iris-game-master-gifted-reborn",
  warrant: "announce",
  body: 'From play in gifted-reborn (Alan, in chat): "I don\'t see my Path of Willpower in the UI, is that missing?"\nHow it happens: the character-skill is marked `unrevealed: true`, so the sheet hides it, but the settled roll\'s terms show it by name ("Path of Willpower", +0) where the player can see it. So the roll reveals a Path the sheet is still hiding. Whether a roll should show a term that\'s still hidden is a call for the engine.\n',
  createdAt: "2026-10-28T00:03:53.165Z",
  updatedAt: "2026-10-28T00:03:53.165Z",
} as const satisfies AgentMessage
