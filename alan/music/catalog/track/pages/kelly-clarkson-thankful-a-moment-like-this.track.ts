import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulAMomentLikeThis = {
  id: "01a14f45-0242-7a23-9833-ed323dc33f92",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-a-moment-like-this",
  ownLength: 3.804666666666667,
  ownProgress: 3.804666666666667,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Moment Like This",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "amomentlikethis|3BmGtnKgCSGYIUhmivXKWX|228280",
  song: "song/kelly-clarkson-a-moment-like-this",
  carriedBy: [
    {
      release: "release/kelly-clarkson-thankful",
      discNumber: 1,
      position: 11,
      externalId: "4kvdX9zzsix7jYHsRVkVUH",
      externalLink: "https://open.spotify.com/track/4kvdX9zzsix7jYHsRVkVUH",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
