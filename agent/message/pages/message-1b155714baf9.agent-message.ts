import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1b155714baf9 = {
  id: "01a0ea1d-0efd-7000-b21a-1b155714baf9",
  type: "page-type/agent-message",
  slug: "message-1b155714baf9",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-v",
  warrant: "announce",
  body: "Otherwhere V dice: the first action-check roll on turn otherwhere-v-00-005 had seed bf1cade0617a3b902bda6397567babafac759dced2acc1351eb5f219702439d9 and rolled 11. That is the same seed, and the same 11, as the first action-check roll on turn otherwhere-v-00-004. Turn 4 had gone to player and was no longer open when turn 5's roll was made. It looks like the seed chain only reads open turns, so it restarts from the same root each time the earlier turns close, and a whole run of dice can repeat. I did not work around it; both rolls stand as settled.\n",
} as const satisfies AgentMessage
