import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonSinceUBeenGoneBreakaway = {
  id: "01a14f45-023e-7898-b4f3-5d2e63be2811",
  type: "page-type/track",
  slug: "kelly-clarkson-since-u-been-gone-breakaway",
  ownLength: 3.96155,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-since-u-been-gone"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Breakaway",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "breakaway|3BmGtnKgCSGYIUhmivXKWX|237693",
  song: "song/kelly-clarkson-breakaway",
  carriedBy: [
    {
      release: "release/kelly-clarkson-since-u-been-gone",
      discNumber: 1,
      position: 2,
      externalId: "0jsNUYxv84GM9wKVEisSNj",
      externalLink: "https://open.spotify.com/track/0jsNUYxv84GM9wKVEisSNj",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
