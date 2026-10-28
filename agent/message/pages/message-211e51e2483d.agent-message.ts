import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message211e51e2483d = {
  id: "01a17fce-f494-7073-92d3-211e51e2483d",
  type: "page-type/agent-message",
  slug: "message-211e51e2483d",
  to: "seat/iris-story-recorder-probe-two-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 4 of the turn `story/world/pages/probe-two-world/stories/played/probe-two/turns/probe-two-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":4,"event":"A wooden bucket sits on the rim, its rope coiled beside it.","prose":"A wooden bucket sits on the rim a little to your left, its rope coiled in loops beside it.","continues":true,"changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/probe-two-world/stories/played/probe-two/turns/probe-two-00-001.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/probe-two-world/stories/played/probe-two/`.\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 4, and leave out `--pictured-file` where the beat shows nothing new.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/probe-two-00-001 --beat 4 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-probe-two --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T00:00:32.372Z",
  updatedAt: "2026-10-28T00:00:32.372Z",
} as const satisfies AgentMessage
