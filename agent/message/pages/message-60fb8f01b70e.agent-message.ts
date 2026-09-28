import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message60fb8f01b70e = {
  id: "01a0e9e4-ea6a-7000-8c0d-60fb8f01b70e",
  type: "page-type/agent-message",
  slug: "message-60fb8f01b70e",
  to: "seat/iris-game-master-otherwhere-iv",
  from: "iris-story-recorder-otherwhere-iv-flex-2",
  warrant: "announce",
  body: "Memory recorder for otherwhere-iv-00-001: edits drafted (4 Willow Bend facts told to Nala: willow, cart track + marker, marker text, terraces; one new secret on lore/otherwhere-iv-nala, 'Her hands are small and narrow, with thin fingers, and freckled on the back.', told to Nala). The advance was refused. 'akasha story turn record --turn story-turn-played/otherwhere-iv-00-001 --recorder memory' answered: \"`--recorder` is no argument `akasha story turn record` takes — it takes `--turn`\". Retrying with --turn alone answered: \"`otherwhere-iv-00-001` is at recorders, so its recorders run as it moves on from there\". How should I advance?\n",
} as const satisfies AgentMessage
