import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiOldPantheon = {
  id: "01a0ea7e-e170-7d1f-bb4d-670fde15d5b1",
  type: "page-type/lore",
  slug: "otherwhere-xi-old-pantheon",
  title: "The Old Pantheon",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-old-pantheon",
  facts: [
    {
      fact: "The old pantheon, the primordial gods, ruled before the light gods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The old gods were jealous and demanded sacrifices.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The old gods' priests held a fortress-sanctuary in the lone mountain, the Hollow Mountain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Hollow Mountain shrine holds five statues, among them Enttiku, Octas and a scarred axe god.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Octas and Gomogog lost their thrones and were exiled to the edges of mankind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A skull mace once served as a high priest's badge and a tool of sacrifice; it was cursed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A grave of the faithful in the lone mountain bears a curse spoken by a dying folk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
