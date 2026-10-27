import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7783888d8f35 = {
  id: "01a17fc7-d572-74af-9d4c-7783888d8f35",
  type: "page-type/agent-message",
  slug: "message-7783888d8f35",
  to: "seat/iris-story-recorder-gifted-reborn-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Gifted: Reborn, and you take its turns one beat at a time.\n\nBeat 2 of the turn `story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-002.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":2,"event":"The demon flinches and tries to curl away, too weak to hold its own shape.","prose":"It flinches. It tries to curl away from you, but it has nothing left to curl with, and its edges sag and run like smoke.","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-002.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/gifted/stories/played/gifted-reborn/`.\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 2, and leave out `--memory-file` where the beat settles nothing.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/gifted-reborn-00-002 --beat 2 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-gifted-reborn --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:52:45.586Z",
  updatedAt: "2026-10-27T23:52:45.586Z",
} as const satisfies AgentMessage
