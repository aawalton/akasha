import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8a47527bd3bd = {
  id: "01a102b4-f0f8-7000-80ee-8a47527bd3bd",
  type: "page-type/agent-message",
  slug: "message-8a47527bd3bd",
  to: "seat/alan",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 05e02400ae3042849a201f33e011aef7abd3a365 found 2 checks newly refusing.\n`no-unused-exports` refused 4 times:\n  story/world/stories/played/modules/portrait-redrawing/portrait-redrawing.module.code.ts — exports `Queue`, which no other file names — a value only its own file names is published for nothing\n  story/world/stories/played/modules/portrait-redrawing/portrait-redrawing.module.code.ts — exports `writtenRepointed`, which no other file names — a value only its own file names is published for nothing\n  story/world/stories/played/modules/portrait-redrawing/portrait-redrawing.module.code.ts — exports `heldAt`, which no other file names — a value only its own file names is published for nothing\n  story/world/stories/played/modules/portrait-redrawing/portrait-redrawing.module.code.ts — exports `gpuQuiet`, which no other file names — a value only its own file names is published for nothing\n`tests-pass` refused 1 time:\n  command/pages/story/turn/modules/turn-reaching/turn-reaching.module.test.ts — Measured between 2026-10-03T16:56:57.004Z and 2026-10-03T16:58:23.551Z. 1 test file failed: command/pages/story/turn/modules/turn-reaching/turn-reaching.module.te... (1250 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
