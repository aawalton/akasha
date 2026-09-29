import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSala = {
  id: "01a0ea86-c326-7868-aa59-5c441a10ff99",
  type: "page-type/lore",
  slug: "otherwhere-xi-sala",
  title: "Sala",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-sala",
  facts: [
    {
      fact: "Sala is a kark woman of the steppes who translates for the Red Tribe.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sala is near the fourth step, taught by an old fifth-step master.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Sala is with the Red Tribe after the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
