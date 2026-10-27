import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message2ef0127dcf5f = {
  id: "01a17f6a-201b-7072-9100-2ef0127dcf5f",
  type: "page-type/agent-message",
  slug: "message-2ef0127dcf5f",
  to: "seat/iris-story-recorder-clone-probe-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 9 of the turn `story/world/pages/test-world/stories/played/clone-probe/turns/clone-probe-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":9,"event":"He sheathes it, the hall quiet around him: board, hearth, open floor.","prose":"You slide it back into its sheath. The hall is quiet around you: the board on the wall, the low fire, the open floor.","continues":true,"at":"2026-11-06T08:50:00.000Z","changes":[{"page":"story-item/clone-probe-player-iron-sword","note":"Iron sword sheathed","key":"slot","from":"item-slot/main-hand","to":null}],"pictured":[]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 9, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/clone-probe-00-001 --beat 9 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-clone-probe --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:10:24.893Z",
  updatedAt: "2026-10-27T22:10:24.893Z",
} as const satisfies AgentMessage
