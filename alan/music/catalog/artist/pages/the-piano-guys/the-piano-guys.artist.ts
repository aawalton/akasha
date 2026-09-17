import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const thePianoGuys = {
  id: "01a06803-676c-700e-b0f5-195d07f0d4ea",
  type: "page-type/artist",
  slug: "the-piano-guys",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "A",
  status: "following",
  tags: ["Instrumental"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0jW6R8CVyVohuUJVcuweDI",
      externalLink: "https://open.spotify.com/artist/0jW6R8CVyVohuUJVcuweDI",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Piano Guys",
} as const satisfies Artist
