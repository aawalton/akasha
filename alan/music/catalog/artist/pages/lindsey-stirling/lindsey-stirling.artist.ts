import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const lindseyStirling = {
  id: "01a06803-676b-7025-8921-64f7cb1796c6",
  type: "page-type/artist",
  slug: "lindsey-stirling",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "B",
  status: "following",
  tags: ["Instrumental"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "378dH6EszOLFShpRzAQkVM",
      externalLink: "https://open.spotify.com/artist/378dH6EszOLFShpRzAQkVM",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Lindsey Stirling",
} as const satisfies Artist
