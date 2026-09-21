import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const florenceTheMachine = {
  id: "01a06803-676b-7010-814c-1bf9cae3ee99",
  type: "page-type/artist",
  slug: "florence-the-machine",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  grade: "B",
  status: "following",
  tags: ["Indie Pop Storyteller"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1moxjboGR7GNWYIMWsRjgG",
      externalLink: "https://open.spotify.com/artist/1moxjboGR7GNWYIMWsRjgG",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Florence + The Machine",
} as const satisfies Artist
