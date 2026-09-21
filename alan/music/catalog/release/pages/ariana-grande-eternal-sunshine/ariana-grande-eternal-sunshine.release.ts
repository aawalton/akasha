import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeEternalSunshine = {
  id: "01a0676a-d71d-7024-9764-ce7e515bb494",
  type: "page-type/release",
  slug: "ariana-grande-eternal-sunshine",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2024-03-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5EYKrEDnKhhcNxGedaRQeK",
      externalLink: "https://open.spotify.com/album/5EYKrEDnKhhcNxGedaRQeK",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "eternal sunshine",
} as const satisfies Release
