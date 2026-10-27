import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message45a0642b352c = {
  id: "01a17f8e-2007-7569-8e75-45a0642b352c",
  type: "page-type/agent-message",
  slug: "message-45a0642b352c",
  to: "seat/iris-story-recorder-test-story-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 4 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-011.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":4,"event":"On the fourth day\'s drill, the guard comes up without thought; swordplay climbs a rung.","prose":"On the fourth day, partway through a run of cuts, your guard comes up before you think to raise it.","at":"2026-11-10T09:30:00.000Z","changes":[{"page":"character-skill/test-story-player-swordplay","note":"Swordplay +1, rung 4 reached (39 → 40)","key":"experience","from":39,"to":40}]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 4, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-011 --beat 4 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:49:43.601Z",
  updatedAt: "2026-10-27T22:49:43.601Z",
} as const satisfies AgentMessage
