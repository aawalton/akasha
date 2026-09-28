import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxAppraiser = {
  id: "01a0ea3d-a2c8-781a-9e1a-4d73798cbdcb",
  type: "page-type/lore",
  slug: "otherwhere-ix-appraiser",
  title: "The Appraiser",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-appraiser",
  facts: [
    {
      fact: "The appraiser is a hooded, robed subordinate of Drathok, ghoulish of look.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The appraiser's hand is icy and calloused, and its grip on the wrist brings freezing pain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The appraiser reads each new summons: growth range, inborn trait, unique trait, scores.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The appraiser serves in Drathok's robed entourage, who hold the summoning circle's barrier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The appraiser was excited to read Mana Manipulation in Markus Brown.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season the appraiser waits with Drathok's entourage by the summoning chamber.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
