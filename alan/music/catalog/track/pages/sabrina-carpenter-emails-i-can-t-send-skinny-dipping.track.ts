import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEmailsICanTSendSkinnyDipping = {
  id: "01a0b111-2490-7aa8-bbcc-6b22817f4675",
  type: "page-type/track",
  slug: "sabrina-carpenter-emails-i-can-t-send-skinny-dipping",
  ownLength: 2.9625,
  ownProgress: 2.9625,
  partOfCollections: ["release/sabrina-carpenter-emails-i-can-t-send"],
  position: 11,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ZvbLYAXwvMfaPtN65QF2D",
      externalLink: "https://open.spotify.com/track/1ZvbLYAXwvMfaPtN65QF2D",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "skinny dipping",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "skinnydipping|74KM79TiuVKeVCqs8QtB0B|177750",
  song: "song/sabrina-carpenter-skinny-dipping",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-emails-i-can-t-send",
      discNumber: 1,
      position: 11,
      externalId: "1ZvbLYAXwvMfaPtN65QF2D",
      externalLink: "https://open.spotify.com/track/1ZvbLYAXwvMfaPtN65QF2D",
    },
  ],
} as const satisfies Track
