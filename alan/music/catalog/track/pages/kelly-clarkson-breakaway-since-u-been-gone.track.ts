import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawaySinceUBeenGone = {
  id: "01a14f45-022d-758a-a500-da80919be97e",
  type: "page-type/track",
  slug: "kelly-clarkson-breakaway-since-u-been-gone",
  ownLength: 3.1493333333333333,
  ownProgress: 3.1493333333333333,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  status: "completed",
  unit: "unit/minutes",
  title: "Since U Been Gone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "sinceubeengone|3BmGtnKgCSGYIUhmivXKWX|188960",
  song: "song/kelly-clarkson-since-u-been-gone",
  carriedBy: [
    {
      release: "release/kelly-clarkson-breakaway",
      discNumber: 1,
      position: 2,
      externalId: "3xrn9i8zhNZsTtcoWgQEAd",
      externalLink: "https://open.spotify.com/track/3xrn9i8zhNZsTtcoWgQEAd",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
