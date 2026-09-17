import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxe15Minutes = {
  id: "01a0b111-1eab-7517-a2de-193e742cf745",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-15-minutes",
  ownLength: 3.1919833333333334,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1zhvxTuSha22nsUT5Nw8gE",
      externalLink: "https://open.spotify.com/track/1zhvxTuSha22nsUT5Nw8gE",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "15 Minutes",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "15minutes|74KM79TiuVKeVCqs8QtB0B|191519",
} as const satisfies Track
