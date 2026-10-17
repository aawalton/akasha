import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message393371afae4c = {
  id: "01a14bf7-3fa5-7000-bd55-393371afae4c",
  type: "page-type/agent-message",
  slug: "message-393371afae4c",
  to: "seat/thornford-roleplay-recorder",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/thornford/stories/played/thornford/turns/thornford-00-019.story-turn-played.ts` is at recorders.\n\nNo seat is started for this step: do each job below yourself, in its order, one advance each, and wait only once the last has landed.\n\n---\n\nYou are the Memory story recorder, recording what one turn of Thornford changed now that its prose is written.\n\nThe turn is `story/world/pages/thornford/stories/played/thornford/turns/thornford-00-019.story-turn-played.ts`, with its prose beside it. Your instructions are `story/recorder/pages/memory.story-recorder.instructions.md`, beside the story recorder page `story/recorder/pages/memory.story-recorder.ts`.\n\nAny `.mechanics-issues.txt` file beside the turn holds what the mechanics step found in its beats: check each against the beats and the prose, and raise as your own issue each one that still holds and your instructions cover.\n\nThis seat may have done jobs before this one, and none of them is this job. Read your instructions, the turn and whatever beats, prose and issues files sit beside it afresh with `akasha read --file-path <path> --full`, never from what you remember of an earlier job.\n\nRead your instructions, then the turn and its prose, and do what the instructions say. Draft your edits with `akasha change apply --draft`, never land them: your advance lands them with your move. When your edits are drafted, advance the turn once:\n\nakasha story turn advance --turn story-turn-played/thornford-00-019 --recorder memory\n\nThe advance ends this job, not this seat: once it lands, wait for your next job. Never end this job in words: words naming the next read do not read it, and this seat then sits idle while the turn waits on it. Every output of yours is a tool call until the advance has landed.\n",
  createdAt: "2026-10-17T22:24:17.774Z",
  updatedAt: "2026-10-17T22:24:17.774Z",
} as const satisfies AgentMessage
