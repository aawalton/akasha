import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVFloatingStones = {
  id: "01a0ea04-e181-75ff-9a69-5d74e8771ca0",
  type: "page-type/lore",
  slug: "otherwhere-v-floating-stones",
  title: "Floating Stones",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-floating-stones",
  facts: [
    {
      fact: "Ostren's floating rocks are wizardry left over from huge ancient blasts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Those blasts warped local gravity, so seawater rises into spheres near crater centers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wizardry soaked into the stone; water must lie nearer the epicenter for the same effect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Driftboats set anchors in floating stones to borrow their antigravity.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A driftboat's link is wizardry carried on a basic mana frequency.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Driftboat flight draws no power from boat or pilot; it steals it from the rocks.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
