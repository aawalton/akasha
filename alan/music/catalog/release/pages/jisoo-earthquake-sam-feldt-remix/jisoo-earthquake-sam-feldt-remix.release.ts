import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jisooEarthquakeSamFeldtRemix = {
  id: "01a0676a-d71c-704a-a17a-0ef37ee74a53",
  type: "page-type/release",
  slug: "jisoo-earthquake-sam-feldt-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jisoo"],
  position: 0,
  publishedAt: "2025-03-14",
  grade: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Qkxjhn3pK2Szp10joHZLq",
      externalLink: "https://open.spotify.com/album/2Qkxjhn3pK2Szp10joHZLq",
      lastSyncedAt: "2025-11-24",
    },
  ],
  title: "earthquake (Sam Feldt remix)",
} as const satisfies Release
