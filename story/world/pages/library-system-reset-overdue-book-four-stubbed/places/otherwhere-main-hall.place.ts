import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereMainHall = {
  id: "01a0e354-6641-76e1-8c6d-4498f9a4c117",
  type: "page-type/place",
  slug: "otherwhere-main-hall",
  title: "The Main Hall",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  facts: [
    {
      fact: "The main hall is at the top of the spiral staircase from the core chamber.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-alan"],
    },
    {
      fact: "The main hall is ornate and massive, and wrecked by centuries of neglect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Books lie scattered everywhere, spines cracked, among broken desks, chairs and tables.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-alan"],
    },
    {
      fact: "The main hall is dimly lit, brighter once a Librarian syncs, and gloomy beyond the entrance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At the main hall's front is the Check-in Counter, a desk five feet tall on a raised platform.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Check-in Counter is carved with trees blossoming into books, words strung like leaves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Check-in Counter shows as Check-in Counter, Administrator Access Only, 20% Operational.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A long path runs back from the counter between massive wooden columns carved low down.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-alan"],
    },
    {
      fact: "Bookshelves rise to the first ceiling, and a second gallery of shelves runs above all round.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-alan"],
    },
    {
      fact: "Loose pages flutter across the main hall, and it smells stale, sad and faintly of hope.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-alan"],
    },
    {
      fact: "Two short steps at the dark back of the hall lead up to a floor of more books and carved rails.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
