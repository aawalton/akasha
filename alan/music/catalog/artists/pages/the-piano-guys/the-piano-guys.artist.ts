import type { Artist } from "akasha/alan/music/catalog/artists/artist.page-type.types.ts"

export const thePianoGuys = {
  id: "01a06803-676c-700e-b0f5-195d07f0d4ea",
  type: "artist",
  slug: "the-piano-guys",
  title: "The Piano Guys",
  partOfCollections: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  rank: "A",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0jW6R8CVyVohuUJVcuweDI",
      externalLink: "https://open.spotify.com/artist/0jW6R8CVyVohuUJVcuweDI",
      lastSyncedAt: "2026-02-23",
    },
  ],
  tags: ["Instrumental"],
} as const satisfies Artist
