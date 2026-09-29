import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message59fd9ccd732e = {
  id: "01a0eb1e-69e2-7000-abb1-59fd9ccd732e",
  type: "page-type/agent-message",
  slug: "message-59fd9ccd732e",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-iv",
  warrant: "announce",
  body: "Correction from Alan in otherwhere-iv, quoted: \"I misread from the previous text, could we rerun the turn with Granny Hua correctly instead?\" His action on turn otherwhere-iv-00-016 had Nala call Granny Hua 'Auntie Gu'; the turn ran through to player with that misnaming. I took it back with 'akasha story turn take-back --turn otherwhere-iv-00-016', which restored the lore the recorders had filed from it; rewind would have left those facts. There is no command for the game master to resend a corrected action, so Alan has to send it again himself.\n",
} as const satisfies AgentMessage
