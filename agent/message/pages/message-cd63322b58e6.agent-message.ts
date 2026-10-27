import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageCd63322b58e6 = {
  id: "01a17f2b-5d51-7053-b81d-cd63322b58e6",
  type: "page-type/agent-message",
  slug: "message-cd63322b58e6",
  to: "seat/iris-story-recorder-test-story-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 1 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-008.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":1,"event":"The player sets the lantern down and draws the iron sword in the middle of the shop.","prose":"You set the lantern down, step back into the middle of the shop and draw your iron sword.","at":"2026-10-27T08:43:00.000Z","changes":[{"page":"story-item/test-story-player-shop-lantern","note":"Lantern set down, out of hand","key":"slot","from":"item-slot/off-hand","to":null}]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 1, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-008 --beat 1 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T21:01:51.251Z",
  updatedAt: "2026-10-27T21:01:51.251Z",
} as const satisfies AgentMessage
