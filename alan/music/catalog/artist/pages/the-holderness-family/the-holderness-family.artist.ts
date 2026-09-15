import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const theHoldernessFamily = {
  id: "01a06803-676c-700d-98bd-82236ce453c1",
  type: "page-type/artist",
  slug: "the-holderness-family",
  title: "The Holderness Family",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  rank: "C",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6tITG4T8LpC0msapZ4wXGA",
      externalLink: "https://open.spotify.com/artist/6tITG4T8LpC0msapZ4wXGA",
      lastSyncedAt: "2026-02-28",
    },
  ],
  tags: ["Comedy", "Satire"],
} as const satisfies Artist
