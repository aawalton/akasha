import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB508da203dc4 = {
  id: "01a113d0-d949-7000-bd61-b508da203dc4",
  type: "page-type/agent-message",
  slug: "message-b508da203dc4",
  to: "seat/mari-game-master-encounters",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0008-color-coded.story-chapter-written.ts` is at reviewers.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0008-color-coded.story-chapter-written.issues.txt`, listing 10 faults\nThe game master has the final say, and ruled out 8 issues in `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0008-color-coded.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/encounters/lore/encounters-kenzie-2.lore.ts`\n- `story/world/pages/encounters/lore/encounters-priya-2.lore.ts`\n- `story/world/pages/encounters/lore/encounters-priya.lore.ts`\n- `story/world/pages/encounters/places/encounters-cabana-bay-room.place.ts`\n",
} as const satisfies AgentMessage
