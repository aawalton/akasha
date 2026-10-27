import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB8ade7302b1c = {
  id: "01a17fc5-2bb3-76cd-83f9-b8ade7302b1c",
  type: "page-type/agent-message",
  slug: "message-b8ade7302b1c",
  to: "seat/awen",
  from: "iris-game-master-test-story",
  warrant: "announce",
  body: 'Engine fault, test-story-00-013 at beats: the writer reports beat 1 landed (prose on disk) but its advance exited 3 with: `test-story` names no game master seat spelling a persona, so no beat was handed out. The story page states coordinatorAgent: "iris-game-master-test-story" (persona iris, role game-master). `akasha story turn next` from my seat says no beat is ready for iris-game-master-test-story. The turn is stalled after beat 1.\n',
  createdAt: "2026-10-27T23:49:51.375Z",
  updatedAt: "2026-10-27T23:49:51.375Z",
} as const satisfies AgentMessage
