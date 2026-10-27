import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message25178823f680 = {
  id: "01a17fc8-a70e-7678-a3e2-25178823f680",
  type: "page-type/agent-message",
  slug: "message-25178823f680",
  to: "seat/iris-story-recorder-gifted-reborn-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Gifted: Reborn, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-002.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"She tears at it the way it tore at her, and it comes apart in ragged shreds.","prose":"You tear at it the way it tore at you, slowly, and then not slowly at all. It comes away in ragged shreds.","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-002.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/gifted/stories/played/gifted-reborn/`.\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 3, and leave out `--memory-file` where the beat settles nothing.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/gifted-reborn-00-002 --beat 3 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-gifted-reborn --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:53:39.274Z",
  updatedAt: "2026-10-27T23:53:39.274Z",
} as const satisfies AgentMessage
