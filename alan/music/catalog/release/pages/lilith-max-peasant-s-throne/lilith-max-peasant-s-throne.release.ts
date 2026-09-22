import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxPeasantSThrone = {
  id: "01a0676a-d726-7069-9249-d79450d26356",
  type: "page-type/release",
  slug: "lilith-max-peasant-s-throne",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2024-01-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1D9XYC5xBF8KODfw4bkKyN",
      externalLink: "https://open.spotify.com/album/1D9XYC5xBF8KODfw4bkKyN",
    },
  ],
  title: "Peasant's Throne",
} as const satisfies Release
