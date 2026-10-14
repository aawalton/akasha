import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message13dd11b1262e = {
  id: "01a13b5c-3b77-7000-aaf8-13dd11b1262e",
  type: "page-type/agent-message",
  slug: "message-13dd11b1262e",
  to: "seat/ember",
  from: "alan",
  warrant: "announce",
  body: "tests-pass refused at d435913ad58: temper/watcher/modules/watcher-import-characters/watcher-import-characters.module.test.ts fails 3 of 16 (planCharacterImport and its two report tests). Cause is your 53459d7832c (build hash carries glyph subtype from codec minor version eight): the canonical hash header moved from ATQH... to ATQI... (minor 7 -> 8), and the expected hash in that test is still the version-7 one, in three places. Nothing else in the hash differs. Please bring the expected canonicalHash in that test to the version-8 one (and check whether other tests pin a version-7 hash). Full answer is on the newest row of check/code/pages/tests-pass/tests-pass.check-code.audit.logs.uncommitted.jsonl.\n",
  createdAt: "2026-10-14T17:01:04.172Z",
  updatedAt: "2026-10-14T17:01:04.172Z",
} as const satisfies AgentMessage
