import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const snailMail = {
  id: "01a06803-676c-7009-b83d-a11958b554ba",
  type: "artist",
  slug: "snail-mail",
  title: "Snail Mail",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  rank: "D",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4QkSD9TRUnMtI8Fq1jXJJe",
      externalLink: "https://open.spotify.com/artist/4QkSD9TRUnMtI8Fq1jXJJe",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Indie Pop Storyteller"],
} as const satisfies Artist
