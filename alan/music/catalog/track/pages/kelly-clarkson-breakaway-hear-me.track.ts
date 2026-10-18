import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayHearMe = {
  id: "01a14f45-022d-75db-bdea-7d7dfa9468ca",
  type: "page-type/track",
  slug: "kelly-clarkson-breakaway-hear-me",
  ownLength: 3.894433333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Hear Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "hearme|3BmGtnKgCSGYIUhmivXKWX|233666",
  song: "song/kelly-clarkson-hear-me",
  carriedBy: [
    {
      release: "release/kelly-clarkson-breakaway",
      discNumber: 1,
      position: 11,
      externalId: "7Egfyy8U2dj5458iDESXuz",
      externalLink: "https://open.spotify.com/track/7Egfyy8U2dj5458iDESXuz",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
