import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB87ba9fe43c4 = {
  id: "01a0e38a-a2d0-7000-8f6e-b87ba9fe43c4",
  type: "page-type/agent-message",
  slug: "message-b87ba9fe43c4",
  to: "seat/alan",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at c2500b3845cb787d7c411c620a81178e98e374c1 found 2 checks newly refusing.\n`no-unused-exports` refused 2 times:\n  temper/addon/pages/combat/modules/combat-ui-stats-panels/combat-ui-stats-panels.module.code.ts — exports `StatFormatter`, which no other file names — a value only its own file names is published for nothing\n  temper/addon/pages/combat/modules/combat-ui-stats-panels/combat-ui-stats-panels.module.code.ts — exports `asStatPercent`, which no other file names — a value only its own file names is published for nothing\n`tests-pass` refused 1 time:\n  alan/web/routes/no-such-route/no-such-route.route.test.ts — Measured between 2026-09-27T15:42:11.371Z and 2026-09-27T15:43:52.894Z. 1 test file failed: alan/web/routes/no-such-route/no-such-route.route.test.ts 1 of 22972 tests failed, over ... (994 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
