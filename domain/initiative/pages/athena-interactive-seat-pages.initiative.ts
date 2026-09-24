import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const athenaInteractiveSeatPages = {
  id: "01a0d3df-f4af-7a95-9f4c-1225394968c2",
  type: "page-type/initiative",
  slug: "athena-interactive-seat-pages",
  domain: "page-type/seat",
  persona: "persona/athena",
  intentStack: [
    {
      statement:
        "The Seats view on alanwalton.com names every seat in the working color the editor shows it in.",
    },
    { statement: "A seat's page shows the seat's conversation since its last compaction." },
    { statement: "A seat's page folds each tool call to the one line the TUI gives it." },
    {
      statement:
        "A message Alan sends from a seat's page queues for that seat as one typed in the TUI does.",
    },
  ],
} as const satisfies Initiative
