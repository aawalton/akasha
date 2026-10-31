import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiNightAtTheOperaSimpleRequest = {
  id: "01a0c43e-7123-7453-9321-c8e39e6f8b00",
  type: "page-type/track",
  slug: "emei-night-at-the-opera-simple-request",
  ownLength: 3.81975,
  ownProgress: 3.81975,
  partOfCollections: ["release/emei-night-at-the-opera"],
  status: "completed",
  unit: "unit/minutes",
  title: "Simple Request",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "simplerequest|7E2aQQjErJocovYFjYLzWU|229185",
  song: "song/emei-simple-request",
  carriedBy: [
    {
      release: "release/emei-night-at-the-opera",
      discNumber: 1,
      position: 5,
      externalId: "2qMXHqR78AghFekIyXExCC",
      externalLink: "https://open.spotify.com/track/2qMXHqR78AghFekIyXExCC",
    },
  ],
  createdAt: "2026-09-21T13:53:41.667Z",
  updatedAt: "2026-10-31T13:00:25.006Z",
  progressedAt: "2026-10-31T13:00:25.006Z",
} as const satisfies Track
