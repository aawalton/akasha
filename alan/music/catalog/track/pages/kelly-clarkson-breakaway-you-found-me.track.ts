import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayYouFoundMe = {
  id: "01a14f45-022e-7665-9cf8-3c466ca3a627",
  type: "page-type/track",
  slug: "kelly-clarkson-breakaway-you-found-me",
  ownLength: 3.6677666666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  status: "not-started",
  unit: "unit/minutes",
  title: "You Found Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "youfoundme|3BmGtnKgCSGYIUhmivXKWX|220066",
  song: "song/kelly-clarkson-you-found-me",
  carriedBy: [
    {
      release: "release/kelly-clarkson-breakaway",
      discNumber: 1,
      position: 9,
      externalId: "3lmcmfMOfVyjqnmI4rNQDA",
      externalLink: "https://open.spotify.com/track/3lmcmfMOfVyjqnmI4rNQDA",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
