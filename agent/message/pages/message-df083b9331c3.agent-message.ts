import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageDf083b9331c3 = {
  id: "01a102b5-7130-7000-bfe0-df083b9331c3",
  type: "page-type/agent-message",
  slug: "message-df083b9331c3",
  to: "seat/mari",
  from: "alan",
  warrant: "announce",
  body: 'The audit at 05e02400ae3 has tests-pass refusing command/pages/story/turn/modules/turn-reaching/turn-reaching.module.test.ts, test "an advance moving a chapter to player starts the next, and a failure is only a fault". It expects the advance to report backlog<TAB>the-saga<TAB>started, but the report is the-saga-0002 recorders -> reviewers, starting reviewer seats, with no backlog line. That follows from your 1b22742ebb0 (recorders run before reviewers): a chapter leaving recorders now goes to reviewers instead of player, so the backlog start the test expects never happens. It reproduces every time, not a flake. Since you are mid-change on the turn steps I have not touched it; the test fixture (a chapter at recorders) or the expectation needs moving to the new order.\n',
} as const satisfies AgentMessage
