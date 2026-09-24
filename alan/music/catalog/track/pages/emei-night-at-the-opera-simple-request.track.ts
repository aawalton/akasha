import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiNightAtTheOperaSimpleRequest = {
  id: "01a0c43e-7123-7453-9321-c8e39e6f8b00",
  type: "page-type/track",
  slug: "emei-night-at-the-opera-simple-request",
  ownLength: 3.81975,
  ownProgress: 0,
  partOfCollections: ["release/emei-night-at-the-opera"],
  status: "not-started",
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
} as const satisfies Track
