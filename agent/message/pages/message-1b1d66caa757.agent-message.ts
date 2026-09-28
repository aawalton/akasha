import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1b1d66caa757 = {
  id: "01a0e9e7-2066-7000-9b9f-1b1d66caa757",
  type: "page-type/agent-message",
  slug: "message-1b1d66caa757",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-v",
  warrant: "announce",
  body: "Otherwhere V, turn otherwhere-v-00-001, mechanics recorder seat iris-story-recorder-otherwhere-v-flex-1: the advance it was handed was 'akasha story turn record --recorder mechanics ...', which record refuses (it takes only --turn and runs only on a turn at player). The recorder's step needs 'akasha story turn advance --turn <turn> --recorder <slug>'. Whatever composes a recorder seat's instructions names the wrong command. I pointed the seat at advance.\n",
} as const satisfies AgentMessage
