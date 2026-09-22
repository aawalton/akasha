import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxMaidenSNight = {
  id: "01a0676a-d724-702a-a684-a26b18f8945b",
  type: "page-type/release",
  slug: "lilith-max-maiden-s-night",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2025-04-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5JFT7uJtbgA3YKPuUQucBH",
      externalLink: "https://open.spotify.com/album/5JFT7uJtbgA3YKPuUQucBH",
    },
  ],
  title: "Maiden's Night",
} as const satisfies Release
