import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayWalkAway = {
  id: "01a14f45-022d-744a-aff8-7f8296b0b3d5",
  type: "page-type/track",
  slug: "kelly-clarkson-breakaway-walk-away",
  ownLength: 3.1551,
  ownProgress: 3.1551,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  status: "completed",
  unit: "unit/minutes",
  title: "Walk Away",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "walkaway|3BmGtnKgCSGYIUhmivXKWX|189306",
  song: "song/kelly-clarkson-walk-away",
  carriedBy: [
    {
      release: "release/kelly-clarkson-breakaway",
      discNumber: 1,
      position: 8,
      externalId: "25sA1vM4BFkTb5cJGWftFo",
      externalLink: "https://open.spotify.com/track/25sA1vM4BFkTb5cJGWftFo",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
