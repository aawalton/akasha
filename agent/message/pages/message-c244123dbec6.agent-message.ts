import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC244123dbec6 = {
  id: "01a0de9e-5ddf-7000-8834-c244123dbec6",
  type: "page-type/agent-message",
  slug: "message-c244123dbec6",
  to: "seat/mari",
  from: "alan",
  warrant: "announce",
  body: 'tests-pass fails seat-send.command.test.ts "a message to a seated seat is sent once as an announcement from the sender" at f699d2753ed and 69c4ee23ff2: refusal "the pages answered the write naming no page for message-…, so where it sits is unknown". It lines up with your 10:15 4f7fcaeae8a (message page composed by the pages service). The test fake answers the write without naming the page it wrote.\n',
} as const satisfies AgentMessage
