import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayGone = {
  id: "01a14f45-022d-71a2-8d1c-26187727376f",
  type: "page-type/track",
  slug: "kelly-clarkson-breakaway-gone",
  ownLength: 3.431766666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Gone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "gone|3BmGtnKgCSGYIUhmivXKWX|205906",
  song: "song/kelly-clarkson-gone",
  carriedBy: [
    {
      release: "release/kelly-clarkson-breakaway",
      discNumber: 1,
      position: 5,
      externalId: "5Canmwvufsc7bMM3v2c286",
      externalLink: "https://open.spotify.com/track/5Canmwvufsc7bMM3v2c286",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
