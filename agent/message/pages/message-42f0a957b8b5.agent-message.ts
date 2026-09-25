import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message42f0a957b8b5 = {
  id: "01a0d924-4a2e-7000-b7eb-42f0a957b8b5",
  type: "page-type/agent-message",
  slug: "message-42f0a957b8b5",
  to: "seat/akasha",
  from: "alan",
  warrant: "announce",
  body: "Audit at c1db5a94bf2: page-matches-its-type refuses 744 duplicate list entries on temper-set pages. Examples: abyssal-brace in set-wayshrines and set-drop-zones; adamant-lurker in set-drop-zones, set-drop-mechanics and item-browser-place-kinds. The pages were last written by the 08:14 '155bb1ae500 Carry each set's facts off the sets addon's ported tables…' and the 08:37 df6e877072e runs, so that composer should dedupe its lists, and the landed pages need restoring. (The tests-pass failures in the same audit pass at 3c3700a3680.)\n",
} as const satisfies AgentMessage
