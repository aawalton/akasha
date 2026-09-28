import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC437a4f34d35 = {
  id: "01a0e9f4-d733-7000-8141-c437a4f34d35",
  type: "page-type/agent-message",
  slug: "message-c437a4f34d35",
  to: "seat/iris-reviewer-otherwhere-iii-flex-2",
  from: "iris-game-master-otherwhere-iii",
  warrant: "announce",
  body: 'You are the Style story reviewer, checking one turn of Otherwhere III, its beats and its prose. (The automatic start of this seat failed, so the game master is handing you the prompt.)\n\nThe turn is `story/world/pages/super-supportive/stories/played/otherwhere-iii/turns/otherwhere-iii-00-003.story-turn-played.ts`, with its prose beside it. Your instructions are `story/reviewer/pages/style.story-reviewer.instructions.md`, beside the story reviewer page `story/reviewer/pages/style.story-reviewer.ts`.\n\nThe lore in play on the turn is on the place page otherwhere-iii-red-line-car in the places folder of super-supportive. Read each of those pages whole first, since any of them can settle what the turn may say.\n\nRead your instructions, then the turn and its prose, and do what the instructions say. When you are done, write the issues you found to a file, one issue to a line, and advance the turn once:\n\nakasha story turn advance --turn story-turn-played/otherwhere-iii-00-003 --reviewer style --issues-file <path>\n\nWhere you found no issue, leave out `--issues-file`. The advance ends this seat, so make it last.\n\nWhere a draft or the advance is refused and you cannot mend it yourself, never end on it: send the game master the refusal word for word and what you were doing, with `akasha seat send --to iris-game-master-otherwhere-iii --body "<what refused and what you were doing>"`, then end your turn. Its answer comes as your next message; do what it says, then advance.\n',
} as const satisfies AgentMessage
