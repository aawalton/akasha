import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const cynthiaErivo = {
  id: "01a0b7a4-2175-7821-8409-c3175b8b6595",
  type: "page-type/artist",
  slug: "cynthia-erivo",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "46UMQ0cW8ToR8egkBRwAxZ",
      externalLink: "https://open.spotify.com/artist/46UMQ0cW8ToR8egkBRwAxZ",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cynthia Erivo",
} as const satisfies Artist
