import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVPaths = {
  id: "01a0ea00-21ad-76bf-8276-0ddce2d4b315",
  type: "page-type/lore",
  slug: "otherwhere-v-paths",
  title: "Paths",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-paths",
  facts: [
    {
      fact: "A Path is a named line of power: the Path of Faith, the mage's path, antimagic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "True commitment to one's Path, with Insights of one's own, is held the truest guide to power.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Davrar rewards focus, so holding two classes splits one's Paths.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wizardry is not the mage path's sure next step; it has Insights of its own.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Antimagic is a known Path, but it normally arises only where Questors are involved.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "People speak of walking their own Path.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
