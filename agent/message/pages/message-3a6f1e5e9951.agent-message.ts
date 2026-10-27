import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3a6f1e5e9951 = {
  id: "01a17fb2-1381-737a-af21-3a6f1e5e9951",
  type: "page-type/agent-message",
  slug: "message-3a6f1e5e9951",
  to: "seat/iris-game-master-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the game master of Test Story, and you take its turns one beat at a time.\n\nBeat 4 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-011.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":4,"event":"The second day\'s drill: a cut turns wrong and the blade opens the player\'s forearm.","at":"2026-11-08T09:30:00.000Z","issues":["beat 4: drill hurt (natural 1, outcome 6) has no health cost on any page; health is 24 of 24"]}\n\nThe numbers seat refused beat 4:\n\n- beat 4: drill hurt (natural 1, outcome 6) has no health cost on any page; health is 24 of 24\n\nState the turn\'s beats again from beat 4 on, or rule the issue out by stating beat 4 as it was. Write a beats file holding beat 4 and the beats after it alone, its first line naming beat 4, as the lines in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-011.story-turn-played.beats.jsonl` are shaped. Hand in none of the beats before beat 4: they are kept as they are, with every part the steps gave them, and every part of beat 4 and the beats after it is worked again.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-011 --beat 4 --beats-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:28:59.597Z",
  updatedAt: "2026-10-27T23:28:59.597Z",
} as const satisfies AgentMessage
