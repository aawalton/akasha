import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7941a2713b83 = {
  id: "01a0e9e5-6cf4-7000-b0a8-7941a2713b83",
  type: "page-type/agent-message",
  slug: "message-7941a2713b83",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-iv",
  warrant: "announce",
  body: "Engine fault in otherwhere-iv: two story recorders (memory, picture) on turn otherwhere-iv-00-001 each tried to hand in drafts with 'akasha story turn record --turn ... --recorder <slug>', which is refused ('--recorder is no argument turn record takes'; then 'turn is at recorders, so its recorders run as it moves on'). The right call is 'akasha story turn advance --turn ... --recorder <slug>'. Two seats making the same wrong call suggests the recorder's instructions or the 'turn record' help steer them to 'record'. I told each seat the right call.\n",
} as const satisfies AgentMessage
