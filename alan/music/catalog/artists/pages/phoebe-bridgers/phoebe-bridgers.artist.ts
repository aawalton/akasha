import type { Artist } from "akasha/alan/music/catalog/artists/artist.page-type.types.ts"

export const phoebeBridgers = {
  id: "01a06803-676c-7004-a9ef-66da0e7a11b6",
  type: "artist",
  slug: "phoebe-bridgers",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "B",
  status: "following",
  tags: ["Indie Pop Storyteller"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1r1uxoy19fzMxunt3ONAkG",
      externalLink: "https://open.spotify.com/artist/1r1uxoy19fzMxunt3ONAkG",
      lastSyncedAt: "2026-09-14",
    },
  ],
  title: "Phoebe Bridgers",
} as const satisfies Artist
