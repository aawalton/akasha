import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageD0d25758e039 = {
  id: "01a17ff6-6bce-75dc-b4aa-d0d25758e039",
  type: "page-type/agent-message",
  slug: "message-d0d25758e039",
  to: "seat/iris-story-recorder-gifted-reborn-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Gifted: Reborn, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-004.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"She leaves the two Unallocated Stats unspent.","prose":"The Unallocated Stats you leave where they are. You don\'t know enough yet to spend them.","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-004.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/gifted/stories/played/gifted-reborn/`.\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 3, and leave out `--pictured-file` where the beat shows nothing new.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/gifted-reborn-00-004 --beat 3 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-gifted-reborn --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T00:43:39.319Z",
  updatedAt: "2026-10-28T00:43:39.319Z",
} as const satisfies AgentMessage
