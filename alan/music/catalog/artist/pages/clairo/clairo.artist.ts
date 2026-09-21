import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const clairo = {
  id: "01a06803-676b-7007-8276-303bac6bb30e",
  type: "page-type/artist",
  slug: "clairo",
  title: "Clairo",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  grade: "C",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3l0CmX0FuQjFxr8SK7Vqag",
      externalLink: "https://open.spotify.com/artist/3l0CmX0FuQjFxr8SK7Vqag",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Indie Pop Storyteller"],
} as const satisfies Artist
