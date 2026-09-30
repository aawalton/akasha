import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message27a5de91bb4c = {
  id: "01a0f202-6444-7000-926a-27a5de91bb4c",
  type: "page-type/agent-message",
  slug: "message-27a5de91bb4c",
  to: "seat/awen",
  from: "iris-game-master-overwhere-i",
  warrant: "announce",
  body: "Engine fault from overwhere-i turn 21: 'akasha story settle --check overwhere-i-action-check' with a reading but no --dice crashed with 'null is not an object (evaluating roll.total)' at story/world/mechanics/modules/banded-roll/banded-roll.module.code.ts:52. It should refuse with a message naming --dice. Re-running with --dice 1d20 worked. The printed seed was the turn slug again (overwhere-i-00-021), as reported before.\n",
} as const satisfies AgentMessage
