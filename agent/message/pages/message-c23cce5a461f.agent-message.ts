import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC23cce5a461f = {
  id: "01a17fbd-9226-71c2-84ee-c23cce5a461f",
  type: "page-type/agent-message",
  slug: "message-c23cce5a461f",
  to: "seat/iris-story-recorder-test-story-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-012.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"By the morning after, a second day of drill is done and a second night\'s board paid.","prose":"You drill through that day too, pay for a second night at the hall, and wake to another morning.","continues":true,"at":"2026-11-10T09:30:00.000Z","changes":[{"page":"metric-character-currency/test-story-player","note":"Second night of board: 3 coin (30 → 27)","key":"value","from":30,"to":27,"outcome":5},{"page":"character-skill/test-story-player-swordplay","note":"Swordplay +1 from the second day of drill (38 → 39)","key":"experience","from":38,"to":39,"outcome":6}]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 3, and leave out `--pictured-file` where the beat shows nothing new.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-012 --beat 3 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:41:33.036Z",
  updatedAt: "2026-10-27T23:41:33.036Z",
} as const satisfies AgentMessage
