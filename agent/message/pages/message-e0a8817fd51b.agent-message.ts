import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageE0a8817fd51b = {
  id: "01a17fdc-bd23-749f-90b2-e0a8817fd51b",
  type: "page-type/agent-message",
  slug: "message-e0a8817fd51b",
  to: "seat/iris-story-recorder-gifted-reborn-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Gifted: Reborn, and you take its turns one beat at a time.\n\nBeat 9 of the turn `story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-003.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":9,"event":"Window: Reward - Path of Soulstealing (mutated), 0 steps.","prose":":::item-award\\nname: Reward\\nnote: Path: Path of Soulstealing (mutated); Steps: 0\\n:::","changes":[{"page":"character-skill/gifted-reborn-nala-path-of-soulstealing","note":"Reward shown: Path of Soulstealing (mutated), 0 steps","key":"unrevealed","from":true,"to":false}],"pictured":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-003.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/gifted/stories/played/gifted-reborn/`.\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 9, and leave out `--memory-file` where the beat settles nothing.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/gifted-reborn-00-003 --beat 9 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-gifted-reborn --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T00:15:35.562Z",
  updatedAt: "2026-10-28T00:15:35.562Z",
} as const satisfies AgentMessage
