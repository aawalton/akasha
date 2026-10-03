import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXAubreyKell = {
  id: "01a0ead9-d528-78ef-8653-81a499be8fad",
  type: "page-type/lore",
  slug: "otherwhere-x-aubrey-kell",
  title: "Lord Aubrey Kell",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-character/otherwhere-x-aubrey-kell",
  facts: [
    {
      fact: "The vale belongs to Lord Aubrey Kell, who never visits; his steward rides in at quarter days.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lord Kell holds the vale, and his steward comes at quarter days.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "character-other/otherwhere-x-aldous-crane",
      ],
    },
    {
      fact: "Aubrey Kell is forty-eight and holds Kell Manor at Wexley's edge, not in the vale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kell is a plain knightly lord, tiered but no great fighter, and minds his rents before his fields.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kell's steward is Wat Rowley; he rides the vale at quarter days and collects the rolls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Quarter day falls nine days after Nala's first morning, so the steward is not due before then.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lord Kell owes the king soldiers at need, and keeps a dozen men for the muster.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A reeve's report of a tokenless stranger would reach Kell's steward, who would send to the Ford.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
