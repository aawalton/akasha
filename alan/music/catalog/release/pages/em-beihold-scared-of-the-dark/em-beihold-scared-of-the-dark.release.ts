import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdScaredOfTheDark = {
  id: "01a0676a-d728-7053-be58-9a1dc2977884",
  type: "page-type/release",
  slug: "em-beihold-scared-of-the-dark",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2025-10-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Xfa5Z4lsJ0WBtrQ6KErH5",
      externalLink: "https://open.spotify.com/album/1Xfa5Z4lsJ0WBtrQ6KErH5",
      lastSyncedAt: "2025-10-30",
    },
  ],
  title: "Scared of the Dark",
} as const satisfies Release
