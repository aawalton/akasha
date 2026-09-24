import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message2284dacd6d18 = {
  id: "01a0d467-1a6a-7000-b0fe-2284dacd6d18",
  type: "page-type/agent-message",
  slug: "message-2284dacd6d18",
  to: "seat/alan",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 923cc260387cc1215ac19787b0dac5c95b06460a found 3 checks newly refusing.\n`index-is-level-with-the-pages` refused 1 time:\n  player/character/temper-account/pages/alanarre/alanarre.temper-account.referenced-by — the index entry for this file is in the index differing from what its page says\n`no-unused-exports` refused 1 time:\n  code/type/narrowing/modules/shape-core/shape-core.module.code.ts — exports `ShapeError`, which no other file names — a value only its own file names is published for nothing\n`tests-pass` refused 3 times:\n  page/index/modules/entries/index-entries.module.test.ts — Measured between 2026-09-24T17:09:34.918Z and 2026-09-24T17:11:19.118Z. 4 test files failed: agent/hook/modules/dispatch-boot/dispatch-boot.module.test.ts page/index/modules/entries/... (3701 characters more)\n  page/index/modules/reaching/reaching.module.test.ts — Measured between 2026-09-24T17:09:34.918Z and 2026-09-24T17:11:19.118Z. 4 test files failed: agent/hook/modules/dispatch-boot/dispatch-boot.module.test.ts page/index/modules/entries/inde... (3676 characters more)\n  page/service/modules/kinds-gathering/kinds-gathering.module.test.ts — Measured between 2026-09-24T17:09:34.918Z and 2026-09-24T17:11:19.118Z. 4 test files failed: agent/hook/modules/dispatch-boot/dispatch-boot.module.test.ts page/index/modu... (3721 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
