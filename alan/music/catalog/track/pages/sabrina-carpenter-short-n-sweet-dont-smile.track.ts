import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDontSmile = {
  id: "01a0b111-20fb-7688-8037-1c98f79978b0",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-dont-smile",
  ownLength: 3.43825,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "09LrGvT9KsACH66RHYMDyR",
      externalLink: "https://open.spotify.com/track/09LrGvT9KsACH66RHYMDyR",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Don’t Smile",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "dontsmile|74KM79TiuVKeVCqs8QtB0B|206295",
  song: "song/sabrina-carpenter-dont-smile",
} as const satisfies Track
