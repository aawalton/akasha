import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiSafeRooms = {
  id: "01a0e9a4-b08b-7cd6-8bcb-db9f63d49abe",
  type: "page-type/lore",
  slug: "otherwhere-ii-safe-rooms",
  title: "Safe Rooms and Obelisks",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Safe rooms are sealed spaces free of every form of danger.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A basic safe room is a small grey stone room with a bed, toilet and water.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Luxury safe rooms offer comforts like fine furnishings, coffee and a view.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Each safe room holds a miniature onyx obelisk with a display beside it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inside a safe room a contestant may browse their profile without limit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A safe room's length and quality depend on performance beforehand.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When a safe room's timer ends, a stair or portal appears to lead onward.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Obelisks of black stone mark System sites and give access to the profile.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "During trials the profile can only be opened once a day at an obelisk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
