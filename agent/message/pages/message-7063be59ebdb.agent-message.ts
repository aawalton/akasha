import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7063be59ebdb = {
  id: "01a17fd2-8883-747a-894f-7063be59ebdb",
  type: "page-type/agent-message",
  slug: "message-7063be59ebdb",
  to: "seat/iris-story-recorder-probe-two-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 9 of the turn `story/world/pages/probe-two-world/stories/played/probe-two/turns/probe-two-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":9,"event":"He straightens at the rim, the bucket and rope by his hand, the stair at his side.","prose":"You straighten up, your hands still on the rim. The bucket sits by your left hand with its coiled rope, and the top step of the stair is a pace to your side.","continues":true,"at":"2026-11-11T09:32:00.000Z","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/probe-two-world/stories/played/probe-two/turns/probe-two-00-001.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/probe-two-world/stories/played/probe-two/`.\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 9, and leave out `--memory-file` where the beat settles nothing.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/probe-two-00-001 --beat 9 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-probe-two --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T00:04:26.834Z",
  updatedAt: "2026-10-28T00:04:26.834Z",
} as const satisfies AgentMessage
