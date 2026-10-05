import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB96138597844 = {
  id: "01a10c41-ea28-7000-b489-b96138597844",
  type: "page-type/agent-message",
  slug: "message-b96138597844",
  to: "seat/alan",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 278c8d9feb62f4631d7e4c78e0871ffc5a774e04 found 1 check newly refusing.\n`no-unused-exports` refused 5 times:\n  command/pages/story/modules/tell-continuing/tell-continuing.module.code.ts — exports `baseOf`, which no other file names — a value only its own file names is published for nothing\n  command/pages/story/modules/tell-continuing/tell-continuing.module.code.ts — exports `continuationTitle`, which no other file names — a value only its own file names is published for nothing\n  command/pages/story/turn/picture/story-turn-picture.command.code.ts — exports `scenesOf`, which no other file names — a value only its own file names is published for nothing\n  command/pages/story/turn/picture/story-turn-picture.command.code.ts — exports `Pictures`, which no other file names — a value only its own file names is published for nothing\n  command/pages/story/turn/picture/story-turn-picture.command.code.ts — exports `askedFor`, which no other file names — a value only its own file names is published for nothing\nwhat each of them answered is on the newest row of the audit log beside that check's page. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
