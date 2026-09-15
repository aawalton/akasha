import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkHybridTheoryBonusEdition = {
  id: "01a0676a-d720-707d-873e-c9f1338f5e4c",
  type: "release",
  slug: "linkin-park-hybrid-theory-bonus-edition",
  title: "Hybrid Theory (Bonus Edition)",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 49.144383,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2000-10-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6hPkbAV3ZXpGZBGUvL6jVM",
      externalLink: "https://open.spotify.com/album/6hPkbAV3ZXpGZBGUvL6jVM",
    },
  ],
} as const satisfies Release
