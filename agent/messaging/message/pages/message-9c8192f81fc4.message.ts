import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message9c8192f81fc4 = {
  id: "01a0b756-1322-7000-b1cb-9c8192f81fc4",
  type: "page-type/message",
  slug: "message-9c8192f81fc4",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 7051d569c1523cc57560a0b818eb698285b33ed8 found 1 check newly refusing.\n`no-page-address-spelled` refused 249 times:\n  alan/music/catalog/modules/song-filing/song-filing.module.test.ts — `page-type/song` spells a page's address as a plain string — a page is reached by importing that page and reading its slug, which a rename carries; a plain string is follow... (13 characters more)\n  alan/music/catalog/modules/song-filing/song-filing.module.test.ts — `artist/sylvia-daley` spells a page's address as a plain string — a page is reached by importing that page and reading its slug, which a rename carries; a plain string is f... (18 characters more)\n  check/code/pages/identifier-matches-its-place/identifier-matches-its-place.check-code.decision.test.ts — `name-format/upper-camel-case` spells a page's address as a plain string — a page is reached by importing that page and reading its slu... (64 characters more)\n  check/code/pages/identifier-matches-its-place/identifier-matches-its-place.check-code.decision.test.ts — `name-format/lower-camel-case` spells a page's address as a plain string — a page is reached by importing that page and reading its slu... (64 characters more)\n  check/code/pages/identifier-matches-its-place/identifier-matches-its-place.check-code.decision.test.ts — `name-format/upper-camel-case` spells a page's address as a plain string — a page is reached by importing that page and reading its slu... (64 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
