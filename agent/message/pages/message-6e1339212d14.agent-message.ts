import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message6e1339212d14 = {
  id: "01a17fee-6c27-7286-933d-6e1339212d14",
  type: "page-type/agent-message",
  slug: "message-6e1339212d14",
  to: "seat/iris-story-recorder-beat-flow-test-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-003.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"He stretches his legs out over the cobbles and leans back.","prose":"You stretch your legs out over the cobbles and lean back.","continues":true,"changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-003.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/test-world/stories/played/beat-flow-test/`.\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 3, and leave out `--memory-file` where the beat settles nothing.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/beat-flow-test-00-003 --beat 3 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-beat-flow-test --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T00:34:54.613Z",
  updatedAt: "2026-10-28T00:34:54.613Z",
} as const satisfies AgentMessage
