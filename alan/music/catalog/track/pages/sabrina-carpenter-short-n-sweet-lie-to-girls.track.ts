import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetLieToGirls = {
  id: "01a0b111-20dd-74fd-a199-cb29620efa48",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-lie-to-girls",
  ownLength: 3.3666833333333335,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5il0jwWUlvgtIzWvzJi12z",
      externalLink: "https://open.spotify.com/track/5il0jwWUlvgtIzWvzJi12z",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Lie To Girls",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "lietogirls|74KM79TiuVKeVCqs8QtB0B|202001",
  song: "song/sabrina-carpenter-lie-to-girls",
} as const satisfies Track
