import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageFf4ae603c9dc = {
  id: "01a18029-19e6-763b-a207-ff4ae603c9dc",
  type: "page-type/agent-message",
  slug: "message-ff4ae603c9dc",
  to: "seat/iris-story-recorder-test-story-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 1 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-014.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":1,"event":"The player looks along the hall\'s walls for a shelf of lamps.","prose":"You look past him, along the hall\'s walls, for a shelf of lamps.","at":"2026-11-13T12:01:00.000Z","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/test-story/turns/test-story-00-014.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/test-world/stories/played/test-story/`.\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 1, and leave out `--memory-file` where the beat settles nothing.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-014 --beat 1 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T01:39:00.051Z",
  updatedAt: "2026-10-28T01:39:00.051Z",
} as const satisfies AgentMessage
