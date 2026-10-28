import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message4d8a4fa3a687 = {
  id: "01a17fcf-4595-7495-a069-4d8a4fa3a687",
  type: "page-type/agent-message",
  slug: "message-4d8a4fa3a687",
  to: "seat/iris-story-recorder-gifted-reborn-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Gifted: Reborn, and you take its turns one beat at a time.\n\nBeat 12 of the turn `story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-002.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":12,"event":"\\"If you understand, kick twice.\\" Then silence, waiting on her.","prose":"\\"If you understand, kick twice.\\" Then it falls silent.","continues":true,"changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-002.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/gifted/stories/played/gifted-reborn/`.\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 12, and leave out `--pictured-file` where the beat shows nothing new.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/gifted-reborn-00-002 --beat 12 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-gifted-reborn --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T00:00:53.548Z",
  updatedAt: "2026-10-28T00:00:53.548Z",
} as const satisfies AgentMessage
