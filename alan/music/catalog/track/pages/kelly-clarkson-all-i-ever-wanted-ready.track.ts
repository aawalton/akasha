import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonAllIEverWantedReady = {
  id: "01a14f45-022c-7f8a-bbfe-b290d0f72a26",
  type: "page-type/track",
  slug: "kelly-clarkson-all-i-ever-wanted-ready",
  ownLength: 3.0657666666666668,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-all-i-ever-wanted"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Ready",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "ready|3BmGtnKgCSGYIUhmivXKWX|183946",
  song: "song/kelly-clarkson-ready",
  carriedBy: [
    {
      release: "release/kelly-clarkson-all-i-ever-wanted",
      discNumber: 1,
      position: 12,
      externalId: "6wOr3b3fPUoiUkvto1ab4q",
      externalLink: "https://open.spotify.com/track/6wOr3b3fPUoiUkvto1ab4q",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
