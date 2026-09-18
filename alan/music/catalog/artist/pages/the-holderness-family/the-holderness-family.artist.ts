import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const theHoldernessFamily = {
  id: "01a06803-676c-700d-98bd-82236ce453c1",
  type: "page-type/artist",
  slug: "the-holderness-family",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "C",
  status: "following",
  tags: ["Comedy", "Satire"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6tITG4T8LpC0msapZ4wXGA",
      externalLink: "https://open.spotify.com/artist/6tITG4T8LpC0msapZ4wXGA",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Holderness Family",
} as const satisfies Artist
