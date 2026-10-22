import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const zaraLarsson = {
  id: "019ea49d-4cae-77bb-905d-4a26379e148e",
  type: "page-type/artist",
  slug: "zara-larsson",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  grade: "A",
  status: "following",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "134e6410-6954-45d1-bd4a-0f2d2ad5471d",
      externalLink: "https://musicbrainz.org/artist/134e6410-6954-45d1-bd4a-0f2d2ad5471d",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "1Xylc3o4UrD53lo9CvFvVg",
      externalLink: "https://open.spotify.com/artist/1Xylc3o4UrD53lo9CvFvVg",
      lastSyncedAt: "2026-10-22",
    },
  ],
  title: "Zara Larsson",
  genre: [
    "dance-pop",
    "electropop",
    "pop",
    "contemporary r&b",
    "alternative pop",
    "dance",
    "disco",
    "hip hop",
  ],
  createdAt: "2026-06-08T00:23:52.750Z",
  updatedAt: "2026-10-22T13:48:14.124Z",
} as const satisfies Artist
