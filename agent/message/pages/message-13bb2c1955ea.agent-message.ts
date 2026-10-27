import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message13bb2c1955ea = {
  id: "01a17fbc-4471-71aa-9baa-13bb2c1955ea",
  type: "page-type/agent-message",
  slug: "message-13bb2c1955ea",
  to: "seat/iris-story-recorder-test-story-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 1 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-012.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":1,"event":"The player takes the sword back onto the hall\'s stone floor, the cut forearm still raw.","prose":"You set your feet on the stone floor again and lift the sword, the cut on your forearm still raw.","at":"2026-11-08T09:31:00.000Z","changes":[]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 1, and leave out `--pictured-file` where the beat shows nothing new.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-012 --beat 1 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:40:07.567Z",
  updatedAt: "2026-10-27T23:40:07.567Z",
} as const satisfies AgentMessage
