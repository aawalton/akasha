import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const athenaInteractiveSeatPages = {
  id: "01a0d3df-f4af-7a95-9f4c-1225394968c2",
  type: "page-type/initiative",
  slug: "athena-interactive-seat-pages",
  domain: "page-type/seat",
  persona: "persona/athena",
  intentStack: [
    { statement: "The page service answers a seat's conversation as a value of that seat." },
    { statement: "A seat's page shows the seat's conversation since its last compaction." },
    { statement: "A seat's page folds each tool call to the one line the TUI gives it." },
    {
      statement:
        "A message Alan sends from a seat's page queues for that seat as one typed in the TUI does.",
    },
    {
      statement:
        "Alan attaches an image to a message from a seat's page, from his photos or from the camera.",
    },
    { statement: "A browser is pushed each change to a page or list it shows, and to no other." },
    {
      statement:
        "A seat's page shows each new message and change of working color live, with no refresh.",
    },
    { statement: "A seat's page is laid out for a phone first and works as well on a desktop." },
  ],
} as const satisfies Initiative
