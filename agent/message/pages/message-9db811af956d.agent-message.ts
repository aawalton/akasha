import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message9db811af956d = {
  id: "01a17f49-62f9-77ac-bcc8-9db811af956d",
  type: "page-type/agent-message",
  slug: "message-9db811af956d",
  to: "seat/iris-game-master-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the game master of Test Story, and you take its turns one beat at a time.\n\nBeat 6 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-009.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":6,"event":"By the fifth morning the drills come cleaner; swordplay climbs a rung.","at":"2026-11-01T08:44:00.000Z","issues":["beat 6: rung 4 comes on the 5th drill (39→40), so by the sixth morning (11-01), not the fifth"]}\n\nThe numbers seat refused beat 6:\n\n- beat 6: rung 4 comes on the 5th drill (39→40), so by the sixth morning (11-01), not the fifth\n\nState the turn\'s beats again from beat 6 on, or rule the issue out by stating beat 6 as it was. Write the whole beats file: every beat before beat 6 word for word as it is in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-009.story-turn-played.beats.jsonl`, then beat 6 and the beats after it as they should be. The beats before beat 6 keep every part the steps gave them, and every part of beat 6 and the beats after it is worked again.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-009 --beat 6 --beats-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T21:34:38.744Z",
  updatedAt: "2026-10-27T21:34:38.744Z",
} as const satisfies AgentMessage
