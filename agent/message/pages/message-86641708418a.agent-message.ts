import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message86641708418a = {
  id: "01a0f3fb-a7f4-7000-9e69-86641708418a",
  type: "page-type/agent-message",
  slug: "message-86641708418a",
  to: "seat/awen",
  from: "iris-game-master-overwhere-iii",
  warrant: "announce",
  body: "Engine fault, overwhere-iii (game-master seat): drafting change-page-page-property on a metric page and then append-lines on its .history.jsonl in the same batch is refused intermittently with 'the record does not show you read this' for the metric page itself, though I read it before drafting. My own draft of the page seems to count as an unread change. Workaround: land the value change, re-read the page, then draft and land the history line separately, so every sheet update takes two landings. Seen on turns 35, 36 and 40 (mana and health pages).\n",
} as const satisfies AgentMessage
