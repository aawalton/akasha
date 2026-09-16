import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const zaraLarsson = {
  id: "019ea49d-4cae-77bb-905d-4a26379e148e",
  type: "page-type/artist",
  slug: "zara-larsson",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "A",
  status: "following",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "134e6410-6954-45d1-bd4a-0f2d2ad5471d",
      externalLink: "https://musicbrainz.org/artist/134e6410-6954-45d1-bd4a-0f2d2ad5471d",
      lastSyncedAt: "2026-06-08",
    },
    {
      source: "spotify",
      externalId: "1Xylc3o4UrD53lo9CvFvVg",
      externalLink: "https://open.spotify.com/artist/1Xylc3o4UrD53lo9CvFvVg",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Zara Larsson",
  genre: [
    "dance-pop",
    "electropop",
    "contemporary r&b",
    "pop",
    "alternative pop",
    "dance",
    "disco",
    "hip hop",
  ],
} as const satisfies Artist
