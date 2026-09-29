import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiAsterley = {
  id: "01a0ea80-ba62-7c3e-b633-07f6989ee18d",
  type: "page-type/place",
  slug: "otherwhere-xi-asterley",
  title: "Asterley",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-deadlands",
  facts: [
    {
      fact: "Asterley is a white-walled Harrakan city in the deadlands, north of Sinur's Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Asterley lies about a third of the way from Sinur's Gate to Old Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Asterley was one of the best-kept dead cities of the deadlands before Harrak reclaimed it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Asterley is New Harrak's last major fortified outpost toward the old capital.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Asterley fell to an undead horde about ten years ago and was later retaken.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Asterley is a haven city for adventurers and trainees who hunt the deadlands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Asterley is the terminal of a rail line to the south.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Black mages at Asterley keep widening the ring of purifying obelisks around it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Asterley's obelisks are linked to charging stations.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
