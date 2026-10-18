import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayBreakaway = {
  id: "01a14f45-022d-7bfc-8b3d-813b31cad060",
  type: "page-type/track",
  slug: "kelly-clarkson-breakaway-breakaway",
  ownLength: 3.95,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Breakaway",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "breakaway|3BmGtnKgCSGYIUhmivXKWX|237000",
  song: "song/kelly-clarkson-breakaway",
  carriedBy: [
    {
      release: "release/kelly-clarkson-breakaway",
      discNumber: 1,
      position: 1,
      externalId: "61Qhe2mHSLhUE04QeK4lkD",
      externalLink: "https://open.spotify.com/track/61Qhe2mHSLhUE04QeK4lkD",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
