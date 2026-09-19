import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const imagineDragons = {
  id: "019ea496-69af-7f85-bcbc-21cde8492feb",
  type: "page-type/artist",
  slug: "imagine-dragons",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "A+",
  status: "following",
  tags: ["Alternative Rock"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "012151a8-0f9a-44c9-997f-ebd68b5389f9",
      externalLink: "https://musicbrainz.org/artist/012151a8-0f9a-44c9-997f-ebd68b5389f9",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "53XhwfbYqKCa1cC15pYq2q",
      externalLink: "https://open.spotify.com/artist/53XhwfbYqKCa1cC15pYq2q",
      lastSyncedAt: "2026-03-02",
    },
  ],
  title: "Imagine Dragons",
  genre: [
    "alternative rock",
    "pop rock",
    "indie pop",
    "pop",
    "alternative pop",
    "electropop",
    "indietronica",
    "rock",
  ],
  reaction: "txt",
} as const satisfies Artist
