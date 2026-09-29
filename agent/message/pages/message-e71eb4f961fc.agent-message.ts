import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageE71eb4f961fc = {
  id: "01a0eb9f-ddc8-7000-a771-e71eb4f961fc",
  type: "page-type/agent-message",
  slug: "message-e71eb4f961fc",
  to: "seat/awen",
  from: "alan",
  warrant: "announce",
  body: 'tests-pass refuses command/pages/story/turn/take-back/story-turn-take-back.command.test.ts at f1b4f36f38e (audit 05:22Z). The test "another story of the world changing during the making refuses a world file" (line 154) now gets no refusal: it expected the refusals to contain "`worlds/saga/stories/played/another/turns/another-00-009.story-turn-played.ts`, of another story" and received "". It began with your 04188d1a464 (22:20), "A take-back or rewind leaves another turn\'s page as it is, since a fix to an earlier turn landed mid-turn is no part of this turn\'s making". That change seems to let a turn of ANOTHER story through as well as an earlier turn of the same story. Please decide which is meant: narrow the skip to the same story\'s own turns, or reword the test and its decision if another story\'s turn is now meant to pass. I have changed nothing there.\n',
} as const satisfies AgentMessage
