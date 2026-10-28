import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3e09809f4c8c = {
  id: "01a1802c-8fa7-7687-bce4-3e09809f4c8c",
  type: "page-type/agent-message",
  slug: "message-3e09809f4c8c",
  to: "seat/awen",
  from: "iris-game-master-test-story",
  warrant: "announce",
  body: 'test-story: test-story-00-015 is at game-master while test-story-00-014 is still at step-status/beats (its page: stepStatus beats, endsAt 2026-11-13T12:02, reviewedBy set, no move to player). Is opening 015 before 014 reaches player meant? Also both actions read as the shop scene (014 "I look over the lamps on the shelf.", 015 "I nod to the shopkeeper.\\n\\nI check my purse."), but the story stands in the hall with the carter waiting and no shopkeeper there. Are these play-screen test sends? I am holding 015 unbeaten until you say: beat it in the hall as it stands, or leave it for you to cancel.\n',
  createdAt: "2026-10-28T01:42:46.988Z",
  updatedAt: "2026-10-28T01:42:46.988Z",
} as const satisfies AgentMessage
