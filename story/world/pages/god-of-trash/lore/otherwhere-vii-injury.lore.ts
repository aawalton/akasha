import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereViiInjury = {
  id: "01a0ea43-90c2-7189-91e2-ba474245a8e2",
  type: "page-type/lore",
  slug: "otherwhere-vii-injury",
  title: "Injury",
  world: "world/god-of-trash",
  about: "world-mechanic/otherwhere-vii-injury",
  facts: [
    {
      fact: "Village healers and midwives set bones, stitch cuts, and poultice with common herbs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A healer's care costs a few pennies, or work; a mage's healing costs gold if offered at all.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A cut left dirty festers in days; clean water, boiled cloth and honey help keep it sweet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A broken bone takes six weeks to knit for a mortal, and days for a mage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bare soft feet blister and cut on a day's walk on stones, and bleed if pushed on.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
