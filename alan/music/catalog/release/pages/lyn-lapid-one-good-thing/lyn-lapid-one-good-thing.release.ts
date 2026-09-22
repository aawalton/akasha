import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidOneGoodThing = {
  id: "01a0c95e-aa20-7acf-af88-43e721ab8ffd",
  type: "page-type/release",
  slug: "lyn-lapid-one-good-thing",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2026-09-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0izq3cdOEnJu9Y4CW0X5Gh",
      externalLink: "https://open.spotify.com/album/0izq3cdOEnJu9Y4CW0X5Gh",
      lastSyncedAt: "2026-09-22",
    },
  ],
  title: "one good thing",
} as const satisfies Release
