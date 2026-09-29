import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKreta = {
  id: "01a0ea8b-d301-7dab-8185-69b243c1ae83",
  type: "page-type/lore",
  slug: "otherwhere-xi-kreta",
  title: "Order Master Kreta",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kreta",
  facts: [
    {
      fact: "Kreta is Order Master of the Golden Order, the women warrior priests of Enttiku.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Golden Order wear gold and black plate and see the threads of death on their targets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kreta speaks Harrakan, and led the Golden Order in the alliance's Glastian purge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Golden Order's master is a squat, dark-skinned, gray-haired woman in plate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Golden Order rode under Enttiku's flag in the final war, gathering the battlefield dead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Kreta is thought to lead the Golden Order with the alliance after the victory.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
