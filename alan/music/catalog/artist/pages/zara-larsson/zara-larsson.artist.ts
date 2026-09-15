import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const zaraLarsson = {
  id: "019ea49d-4cae-77bb-905d-4a26379e148e",
  type: "artist",
  slug: "zara-larsson",
  title: "Zara Larsson",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  rank: "A",
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
      lastSyncedAt: "2026-02-20",
    },
  ],
} as const satisfies Artist
