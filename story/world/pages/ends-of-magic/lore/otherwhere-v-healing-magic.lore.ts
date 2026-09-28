import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVHealingMagic = {
  id: "01a0ea01-9175-75aa-b6fb-bcd492ed0d57",
  type: "page-type/lore",
  slug: "otherwhere-v-healing-magic",
  title: "Healing Magic",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-healing-magic",
  facts: [
    {
      fact: "Healing spells are tiered; Moderate Curing is one of the middle tier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Healing magic can regrow a limb blown off by Disintegrate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arena healing magic rejuvenates injured fighters, and few die in its care.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Healing magic and divine light can mend armor as well as wounds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Healing potions, charms and worn healing artifacts exist.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Strong mages carry life-saving healing spells that trigger when they are hurt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Healing overlaps mind magic; it can snarl a brain into unthinking loyalty.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Glamours use healing to improve the body itself, not just its look.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Divine healing can mend a lethal wound in seconds, down to the clothes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some wounds resist all but the greatest healing magics.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
