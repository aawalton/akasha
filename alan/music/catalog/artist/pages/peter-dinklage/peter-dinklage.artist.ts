import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const peterDinklage = {
  id: "01a0b7a4-217a-7796-ac09-1115ccda9414",
  type: "page-type/artist",
  slug: "peter-dinklage",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0pHTIdyC4DAsoMhpSufQaz",
      externalLink: "https://open.spotify.com/artist/0pHTIdyC4DAsoMhpSufQaz",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Peter Dinklage",
} as const satisfies Artist
