import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeDontSmile = {
  id: "01a0b111-1e7a-7820-817a-2a2acdbdebea",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-dont-smile",
  ownLength: 3.4388833333333335,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0LB0SY2DW67uRjbDWcAHMZ",
      externalLink: "https://open.spotify.com/track/0LB0SY2DW67uRjbDWcAHMZ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Don’t Smile",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "dontsmile|74KM79TiuVKeVCqs8QtB0B|206333",
  song: "song/sabrina-carpenter-dont-smile",
} as const satisfies Track
