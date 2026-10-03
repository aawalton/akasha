import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSmoke = {
  id: "01a0ea90-0dd6-702a-b525-9dad6bc0dd1c",
  type: "page-type/lore",
  slug: "otherwhere-xi-smoke",
  title: "Smoke",
  world: "world/the-calamitous-bob-stubbed",
  about: "character-other/otherwhere-xi-smoke",
  facts: [
    {
      fact: "Smoke is Tobin Ashlar's sheepdog, a shaggy gray bitch of about five years.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Smoke is knee-high and rangy, with one blue eye, one brown, and a burr-matted coat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Smoke wears a collar of studded goat hide against scalehound bites.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Smoke works the Ashlar flock to Tobin's whistles and sleeps across the fold gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Smoke barks at strangers on the road until Tobin or Wenna calls her off.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Smoke has a torn ear and three scars from a scalehound she held off last spring.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Smoke would circle a barefoot stranger, sniff her feet, and then lean on her legs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Smoke begs for cheese rinds and will follow anyone who shares one.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Smoke hates the smell of the Salt Widow's charms and sneezes at them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Smoke fears thunder and hides under the Ashlar table in storms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Smoke inspects as "[Sheepdog: not dangerous. Herder. Loyal. Scalehound fighter.]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Smoke keeps the Ashlar flock on her own when Tobin tells her to.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-xi-nala",
        "world-character/otherwhere-xi-tobin-ashlar",
        "character-other/otherwhere-xi-smoke",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
