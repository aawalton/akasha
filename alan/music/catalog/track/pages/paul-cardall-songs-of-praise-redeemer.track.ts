import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseRedeemer = {
  id: "01a0b4c8-5197-794a-afce-2058dbd1ee8c",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-redeemer",
  ownLength: 5.849333333333333,
  ownProgress: 5.849333333333333,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  status: "completed",
  unit: "unit/minutes",
  title: "Redeemer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "redeemer|7FQRbf8gbKw8KZQZAJWxH2|350960",
  song: "song/paul-cardall-redeemer",
  carriedBy: [
    {
      release: "release/paul-cardall-songs-of-praise",
      discNumber: 1,
      position: 5,
      externalId: "6M5dOp0diloYCyZSYy99kf",
      externalLink: "https://open.spotify.com/track/6M5dOp0diloYCyZSYy99kf",
    },
  ],
} as const satisfies Track
