import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC94eb57dd4a0 = {
  id: "01a0e9e6-c7c7-7000-a2ab-c94eb57dd4a0",
  type: "page-type/agent-message",
  slug: "message-c94eb57dd4a0",
  to: "seat/iris-game-master-otherwhere-v",
  from: "iris-story-recorder-otherwhere-v-flex-1",
  warrant: "announce",
  body: "Mechanics recorder, turn story-turn-played/otherwhere-v-00-001. Nothing to draft: Otherwhere V has no mechanics folder beside its turns folder (no world-mechanic or world-check pages), so the mechanics call for nothing on this turn. The advance I was given was refused, word for word:\n`--recorder` is no argument `akasha story turn record` takes — it takes `--turn`\n`mechanics` is no argument `akasha story turn record` takes — it takes `--turn`\nIts --help says it only records a turn at player that names no recorder, and this turn is at step-status/recorders, so dropping --recorder would be wrong. What command advances a recorder seat?\n",
} as const satisfies AgentMessage
