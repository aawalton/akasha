import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXMaudFerrer = {
  id: "01a0eb32-31d1-737b-b934-758cfee66490",
  type: "page-type/lore",
  slug: "otherwhere-x-maud-ferrer",
  title: "Maud Ferrer",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-character/otherwhere-x-maud-ferrer",
  facts: [
    {
      fact: "Maud Ferrer is forty, weathered and stern, Tier 1, fair but never easy to fool.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maud lost a brother at the border camp; she takes the skinwalker rumours seriously.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maud keeps to the waystation on day two and comes east only if the patrol sends for her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maud reads a stranger's hands and boots before her face, and asks each question twice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A reeve's word weighs heavily with Maud; she has known Aldous Crane for twelve years.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maud spends the tablet's two gold on a stranger no reeve will vouch for.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maud has a daughter of nine at Wexley with her sister, and writes to her each quarter day.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
