import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenTwoYoungHearts = {
  id: "01a0b111-28d1-721a-bd9e-bbdd453489fa",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-two-young-hearts",
  ownLength: 3.8933333333333335,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "47hRbUwwBU3E2wyIA8OE4x",
      externalLink: "https://open.spotify.com/track/47hRbUwwBU3E2wyIA8OE4x",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Two Young Hearts",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "twoyounghearts|74KM79TiuVKeVCqs8QtB0B|233600",
  song: "song/sabrina-carpenter-two-young-hearts",
} as const satisfies Track
