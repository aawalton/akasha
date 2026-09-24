import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3PussPuss = {
  id: "01a0aa7c-2a39-7881-9b5e-b9bcbfefeabc",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-puss-puss",
  ownLength: 3.8019666666666665,
  ownProgress: 3.8019666666666665,
  partOfCollections: [
    "release/zara-larsson-midnight-sun-3",
    "release/zara-larsson-midnight-sun-girls-trip",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Puss Puss",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "pusspuss|1Xylc3o4UrD53lo9CvFvVg|228118",
  song: "song/zara-larsson-puss-puss",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-3",
      discNumber: 1,
      position: 10,
      externalId: "3TWc9D5uVyosC49bamnJBa",
      externalLink: "https://open.spotify.com/track/3TWc9D5uVyosC49bamnJBa",
    },
    {
      release: "release/zara-larsson-midnight-sun-girls-trip",
      discNumber: 2,
      position: 10,
      externalId: "1RDJPcDoF8yFiAEoehJmH4",
      externalLink: "https://open.spotify.com/track/1RDJPcDoF8yFiAEoehJmH4",
    },
  ],
} as const satisfies Track
