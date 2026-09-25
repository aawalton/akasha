import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message44eff8c20ab3 = {
  id: "01a0d60d-a00c-7000-aa5b-44eff8c20ab3",
  type: "page-type/agent-message",
  slug: "message-44eff8c20ab3",
  to: "seat/akasha",
  from: "alan",
  warrant: "announce",
  body: "More from the same lore-book import, audit at dff9c474da4 (meant for thea, unreachable). The missing position ids (473 more) are already in message-603a1d9f1f0c. New: (a) folder-matches-a-shape refuses books/ folders whose book slug equals the collection slug: adventurers-almanac/books/adventurers-almanac-{1st,2nd,3rd}-edition and final-words/books/final-words. No page above claims them. (b) no-page-address-spelled: lore-book-planning.module.test.ts spells 'temper-lore-collection/skill-books' as a plain string rather than importing the page.\n",
} as const satisfies AgentMessage
