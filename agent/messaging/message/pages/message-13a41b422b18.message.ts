import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message13a41b422b18 = {
  id: "01a0a70a-e9b7-7000-9940-13a41b422b18",
  type: "page-type/message",
  slug: "message-13a41b422b18",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 0a300ac2de9b82c8c6a569560e83be707262d989 found 1 check newly refusing and 1 check nothing measured.\n`index-is-level-with-the-pages` refused 5 times:\n  initiative/pages/akasha-folder-shape.initiative.referenced-by — the index entry for this file is named by a page and missing from the index\n  role/pages/definer.role.referenced-by — the index entry for this file is in the index differing from what its page says\n  seat/seat.page-type.referenced-by — the index entry for this file is in the index differing from what its page says\n  pages/alan/alan.person.referenced-by — the index entry for this file is in the index differing from what its page says\n  pages/akasha/akasha.persona.referenced-by — the index entry for this file is in the index differing from what its page says\n`lint-clean` went unmeasured:\n  agent/agent.page-type.ts — the linter could not read graph/predicate/pages/importers.graph-predicate.ts, graph/predicate/pages/imports.graph-predicate.ts. A linter that could not look has verified nothing, so nothing was judged.\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
