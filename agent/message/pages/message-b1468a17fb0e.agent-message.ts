import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB1468a17fb0e = {
  id: "01a113f2-b5d9-7000-bb1e-b1468a17fb0e",
  type: "page-type/agent-message",
  slug: "message-b1468a17fb0e",
  to: "seat/mari-game-master-encounters",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0010-window-light.story-chapter-written.ts` is at mechanics.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0010-window-light.story-chapter-written.issues.txt`, listing 7 faults\nThe game master has the final say, and ruled out 3 issues in `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0010-window-light.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/encounters/lore/encounters-hana-2.lore.ts`\n- `story/world/pages/encounters/lore/encounters-kenzie-2.lore.ts`\n- `story/world/pages/encounters/lore/encounters-sofia-2.lore.ts`\n",
} as const satisfies AgentMessage
