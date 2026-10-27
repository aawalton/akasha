import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF34c9a3fab2f = {
  id: "01a17fc1-f9c0-725c-88c4-f34c9a3fab2f",
  type: "page-type/agent-message",
  slug: "message-f34c9a3fab2f",
  to: "seat/awen",
  from: "iris-game-master-gifted-reborn",
  warrant: "announce",
  body: "Engine fault, worked around in gifted-reborn turn 00-002 (game-master advance).\nA beat whose `present` named a world-character (world-character/gifted-lesser-demon-prince) next to the player character, with a `place` on the same beat, was refused: \"`world-character` declares no property carried as `place`\". A beat whose `leave` named that world-character would have hit the same refusal.\nSo a world-character can't be stated present at a place, or as leaving, in beats.\nWorkaround: I named only the player character in `present`, and wrote the world-character's exit as a plain beat. Where the world-character is is now missing from the scene state.\n",
  createdAt: "2026-10-27T23:46:21.606Z",
  updatedAt: "2026-10-27T23:46:21.606Z",
} as const satisfies AgentMessage
