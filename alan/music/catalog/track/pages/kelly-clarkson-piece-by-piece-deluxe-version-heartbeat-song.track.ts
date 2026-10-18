import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonPieceByPieceDeluxeVersionHeartbeatSong = {
  id: "01a14f45-023c-70a2-90b1-028398857367",
  type: "page-type/track",
  slug: "kelly-clarkson-piece-by-piece-deluxe-version-heartbeat-song",
  ownLength: 3.31235,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-piece-by-piece-deluxe-version"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Heartbeat Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "heartbeatsong|3BmGtnKgCSGYIUhmivXKWX|198741",
  song: "song/kelly-clarkson-heartbeat-song",
  carriedBy: [
    {
      release: "release/kelly-clarkson-piece-by-piece-deluxe-version",
      discNumber: 1,
      position: 1,
      externalId: "4WGgAdWVeF0ExmWow9R9XY",
      externalLink: "https://open.spotify.com/track/4WGgAdWVeF0ExmWow9R9XY",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
