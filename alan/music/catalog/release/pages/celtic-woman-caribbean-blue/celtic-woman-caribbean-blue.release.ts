import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWomanCaribbeanBlue = {
  id: "01a19794-d20f-7d9c-9b44-6e9e4b15b9be",
  type: "page-type/release",
  slug: "celtic-woman-caribbean-blue",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2026-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2W6IPXDRLpOPJjktfatD3Q",
      externalLink: "https://open.spotify.com/album/2W6IPXDRLpOPJjktfatD3Q",
      lastSyncedAt: "2026-11-01",
    },
  ],
  title: "Caribbean Blue",
  createdAt: "2026-11-01T14:47:55.150Z",
  updatedAt: "2026-11-01T15:00:42.655Z",
} as const satisfies Release
