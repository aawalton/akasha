import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message034c3fb3cd50 = {
  id: "01a17fd2-4302-7369-aa79-034c3fb3cd50",
  type: "page-type/agent-message",
  slug: "message-034c3fb3cd50",
  to: "seat/iris-story-recorder-probe-two-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 8 of the turn `story/world/pages/probe-two-world/stories/played/probe-two/turns/probe-two-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":8,"event":"Beside the well, a stone stair leads down out of the square.","prose":"At the edge of your sight, just past the well\'s base, a stone stair leads down out of the square.","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/probe-two-world/stories/played/probe-two/turns/probe-two-00-001.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/probe-two-world/stories/played/probe-two/`.\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 8, and leave out `--pictured-file` where the beat shows nothing new.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/probe-two-00-001 --beat 8 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-probe-two --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T00:04:09.004Z",
  updatedAt: "2026-10-28T00:04:09.004Z",
} as const satisfies AgentMessage
