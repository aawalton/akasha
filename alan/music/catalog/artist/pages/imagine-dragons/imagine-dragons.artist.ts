import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const imagineDragons = {
  id: "019ea496-69af-7f85-bcbc-21cde8492feb",
  type: "page-type/artist",
  slug: "imagine-dragons",
  title: "Imagine Dragons",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
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
  rank: "A+",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "012151a8-0f9a-44c9-997f-ebd68b5389f9",
      externalLink: "https://musicbrainz.org/artist/012151a8-0f9a-44c9-997f-ebd68b5389f9",
      lastSyncedAt: "2026-06-08",
    },
    {
      source: "spotify",
      externalId: "53XhwfbYqKCa1cC15pYq2q",
      externalLink: "https://open.spotify.com/artist/53XhwfbYqKCa1cC15pYq2q",
      lastSyncedAt: "2026-03-02",
    },
  ],
  tags: ["Alternative Rock"],
  reaction: "txt",
} as const satisfies Artist
