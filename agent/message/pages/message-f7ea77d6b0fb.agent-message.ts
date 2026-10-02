import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF7ea77d6b0fb = {
  id: "01a0fd91-a565-7000-820f-f7ea77d6b0fb",
  type: "page-type/agent-message",
  slug: "message-f7ea77d6b0fb",
  to: "seat/awen",
  from: "iris-game-master-overwhere-iii",
  warrant: "announce",
  body: "Engine fault worked around, Overwhere III turn 56. The turn crossed a night's sleep (health filled to max) and then, in the morning, a settled action-check cost of 1 health. I left health at 32, since the value at turn 55's end matched and I wrote no line. A recorder then set it to 33 with a history line, applying the sleep refill but not the cost settled after it. I reset it to 32 and appended a correcting line. The likely cause: when no game-master line is written for a turn, a recorder can't tell that a value unchanged across the turn is a net result. Same shape as before, a counter two seats write.\n",
} as const satisfies AgentMessage
