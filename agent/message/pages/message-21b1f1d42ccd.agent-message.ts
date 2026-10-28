import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message21b1f1d42ccd = {
  id: "01a17fef-323a-77db-b16d-21b1f1d42ccd",
  type: "page-type/agent-message",
  slug: "message-21b1f1d42ccd",
  to: "seat/iris-story-recorder-beat-flow-test-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 4 of the turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-003.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":4,"event":"The empty square is still around him, the hall steps and the green door in plain view.","prose":"The square is empty and still. From the bench you can see the steps up to the hall and the green door in the shopfront.","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-003.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/test-world/stories/played/beat-flow-test/`.\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 4, and leave out `--memory-file` where the beat settles nothing.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/beat-flow-test-00-003 --beat 4 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-beat-flow-test --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T00:35:45.249Z",
  updatedAt: "2026-10-28T00:35:45.249Z",
} as const satisfies AgentMessage
