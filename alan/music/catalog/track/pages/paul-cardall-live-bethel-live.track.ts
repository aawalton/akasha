import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveBethelLive = {
  id: "01a0b4c8-57a3-7529-8b01-4ab17e8a0e9d",
  type: "page-type/track",
  slug: "paul-cardall-live-bethel-live",
  ownLength: 2.80555,
  ownProgress: 2.80555,
  partOfCollections: ["release/paul-cardall-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bethel - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "bethellive|7FQRbf8gbKw8KZQZAJWxH2|168333",
  song: "song/paul-cardall-bethel",
  carriedBy: [
    {
      release: "release/paul-cardall-live",
      discNumber: 1,
      position: 3,
      externalId: "2d8F4yWixkIhXfmWKbwKP6",
      externalLink: "https://open.spotify.com/track/2d8F4yWixkIhXfmWKbwKP6",
    },
  ],
} as const satisfies Track
