import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeLieToGirls = {
  id: "01a0b111-1e57-77a2-8bbf-3dc279f0f911",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-lie-to-girls",
  ownLength: 3.3666666666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0I6ZBVBb7DXfjVVCM0NmSQ",
      externalLink: "https://open.spotify.com/track/0I6ZBVBb7DXfjVVCM0NmSQ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Lie To Girls",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "lietogirls|74KM79TiuVKeVCqs8QtB0B|202000",
  song: "song/sabrina-carpenter-lie-to-girls",
} as const satisfies Track
