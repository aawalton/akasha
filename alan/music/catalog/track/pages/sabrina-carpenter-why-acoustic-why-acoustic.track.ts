import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterWhyAcousticWhyAcoustic = {
  id: "01a0b111-324d-75d2-bd26-62eb4c93e2d7",
  type: "page-type/track",
  slug: "sabrina-carpenter-why-acoustic-why-acoustic",
  ownLength: 3.075,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-why-acoustic"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5XdU66WYiYmqe1mBPepVAQ",
      externalLink: "https://open.spotify.com/track/5XdU66WYiYmqe1mBPepVAQ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Why - Acoustic",
  trackType: "acoustic",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "whyacoustic|74KM79TiuVKeVCqs8QtB0B|184500",
  song: "song/sabrina-carpenter-why",
} as const satisfies Track
