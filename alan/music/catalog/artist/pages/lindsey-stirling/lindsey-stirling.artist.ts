import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const lindseyStirling = {
  id: "01a06803-676b-7025-8921-64f7cb1796c6",
  type: "artist",
  slug: "lindsey-stirling",
  title: "Lindsey Stirling",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  rank: "B",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "378dH6EszOLFShpRzAQkVM",
      externalLink: "https://open.spotify.com/artist/378dH6EszOLFShpRzAQkVM",
      lastSyncedAt: "2026-02-08",
    },
  ],
  tags: ["Instrumental"],
} as const satisfies Artist
