import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message09fa7bd521eb = {
  id: "01a0ca86-9b8f-7000-a7b2-09fa7bd521eb",
  type: "page-type/agent-message",
  slug: "message-09fa7bd521eb",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at deadabf441ee2cb1d1e1c27a4fe7341a01cbbdbe found 3 checks newly refusing.\n`index-is-level-with-the-pages` refused 713 times:\n  world/pages/the-wandering-inn/mechanics/aspects/body-of-the-eater.world-aspect.referenced-by — the index entry for this file is named by a page and missing from the index\n  world/pages/the-wandering-inn/mechanics/aspects/odour-of-carrion-dreams.world-aspect.referenced-by — the index entry for this file is named by a page and missing from the index\n  world/pages/the-wandering-inn/mechanics/aspects/rending-claws.world-aspect.referenced-by — the index entry for this file is named by a page and missing from the index\n  world/pages/the-wandering-inn/mechanics/boons/blessing-of-fecundity.world-boon.referenced-by — the index entry for this file is named by a page and missing from the index\n  world/pages/the-wandering-inn/mechanics/boons/commonfolk-s-blessing-lesser-folk-s-vitales-gift.world-boon.referenced-by — the index entry for this file is named by a page and missing from the index\n`no-unused-exports` refused 2 times:\n  command/pages/music/merge-tracks/music-merge-tracks.command.code.ts — exports `tracksIn`, which no other file names — a value only its own file names is published for nothing\n  command/pages/music/merge-tracks/music-merge-tracks.command.code.ts — exports `mergingOver`, which no other file names — a value only its own file names is published for nothing\n`tests-pass` refused 1 time:\n  check/modules/audit-job/audit-job.module.test.ts — Measured between 2026-09-22T19:07:55.722Z and 2026-09-22T19:09:20.082Z. 2 test files failed: agent/message/notice/modules/compose-notices/compose-notices.module.test.ts check/modules/audit-... (1607 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies AgentMessage
