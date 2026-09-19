import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeGoodGraces = {
  id: "01a0b111-1d33-739d-ab9f-5e5ed32b1214",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-good-graces",
  ownLength: 3.0877666666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5JiTjhx7lhqYgsIGpo0VFy",
      externalLink: "https://open.spotify.com/track/5JiTjhx7lhqYgsIGpo0VFy",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Good Graces",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "goodgraces|74KM79TiuVKeVCqs8QtB0B|185266",
  song: "song/sabrina-carpenter-good-graces",
} as const satisfies Track
