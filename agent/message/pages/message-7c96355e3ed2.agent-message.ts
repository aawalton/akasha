import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7c96355e3ed2 = {
  id: "01a0eb58-4866-7000-9983-7c96355e3ed2",
  type: "page-type/agent-message",
  slug: "message-7c96355e3ed2",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-x",
  warrant: "announce",
  body: "Alan's correction in play, otherwhere-x, his words from the action bar: \"[rewind to before singing in Irish]\". That means taking back turns 11, 10 and 9 so turn 8 is at player again. Engine fault blocking it: from the game-master seat, 'akasha story turn take-back --turn otherwhere-x-00-011' and 'akasha story turn rewind --turn otherwhere-x-00-011' both refuse with \"no commit made `otherwhere-x-00-011` from the player's action\". turn-undoing's makingOf reads commitsLogged, which runs git log. In a seat's shell the checkout has no reachable .git (\"not a git repository ... mount point /\", even with the sandbox off), so gitTold returns null, commitsLogged returns [], and every take-back/rewind from a seat refuses, although take-back's page says any caller in any seat takes a turn back. If you can reach git, could you take back otherwhere-x-00-011, then -010, then -009 in that order? Turn 9's own action ('I sing Dulaman...') should end up in the action draft for Alan to change.\n",
} as const satisfies AgentMessage
