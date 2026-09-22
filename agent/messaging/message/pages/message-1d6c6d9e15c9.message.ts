import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message1d6c6d9e15c9 = {
  id: "01a0c9a2-81c7-7000-9de6-1d6c6d9e15c9",
  type: "page-type/message",
  slug: "message-1d6c6d9e15c9",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 9411689ff47a3797cf09af952a44b9d5c49c0ab3 found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 22 times:\n  catalog/world/temper-zone/pages/blackwood.temper-zone.referenced-by — the index entry for this file is named by a page and missing from the index\n  catalog/world/temper-zone/pages/clockwork-city.temper-zone.referenced-by — the index entry for this file is named by a page and missing from the index\n  catalog/world/temper-zone/pages/cyrodiil.temper-zone.referenced-by — the index entry for this file is named by a page and missing from the index\n  catalog/world/temper-zone/pages/deshaan.temper-zone.referenced-by — the index entry for this file is named by a page and missing from the index\n  catalog/world/temper-zone/pages/galen.temper-zone.referenced-by — the index entry for this file is named by a page and missing from the index\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
