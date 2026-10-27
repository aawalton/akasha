import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message66e958b47a28 = {
  id: "01a17f1f-0c83-77b7-b3b9-66e958b47a28",
  type: "page-type/agent-message",
  slug: "message-66e958b47a28",
  to: "seat/iris-story-recorder-test-story-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 4 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-006.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":4,"event":"She sets the lantern on the counter and slides the lit taper toward the player.","prose":"She pushes the lantern across to your side of the counter, then slides a lit taper after it.","changes":[{"page":"story-item/test-story-player-shop-lantern","note":"Gained: Lantern, bought for 8 copper, filled with oil","make":{"title":"Lantern","world":"world/test-world","story":"story-played/test-story","character":"character-player/test-story-player","category":"tool","description":"A tin lantern with a glass window and a wire handle, bought filled with oil."}}],"pictured":[]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 4, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-006 --beat 4 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T20:48:24.037Z",
  updatedAt: "2026-10-27T20:48:24.037Z",
} as const satisfies AgentMessage
