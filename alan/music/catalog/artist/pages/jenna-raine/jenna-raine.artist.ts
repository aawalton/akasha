import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const jennaRaine = {
  id: "01a06803-676b-701a-9ca9-99798f886cb0",
  type: "page-type/artist",
  slug: "jenna-raine",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  status: "following",
  tags: ["Indie Pop Storyteller"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3aHe9rMa5HFTjXHw8tEz0A",
      externalLink: "https://open.spotify.com/artist/3aHe9rMa5HFTjXHw8tEz0A",
      lastSyncedAt: "2026-10-27",
    },
  ],
  title: "Jenna Raine",
  createdAt: "2026-09-03T16:04:08.683Z",
  updatedAt: "2026-10-27T13:47:07.165Z",
} as const satisfies Artist
