import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const thePianoGuys3InTheStars = {
  id: "01a0676a-d721-706c-a3c3-6ff50aa72a8c",
  type: "release",
  slug: "the-piano-guys-3-in-the-stars",
  title: "In The Stars",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 8.874583,
  ownProgress: 8.874583,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-06-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ITtikez8qEWjd6r2YsEhh",
      externalLink: "https://open.spotify.com/album/5ITtikez8qEWjd6r2YsEhh",
    },
  ],
} as const satisfies Release
