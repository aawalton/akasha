import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeJuno = {
  id: "01a0b111-1e33-7740-9b9d-13c593c539b3",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-juno",
  ownLength: 3.7197666666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0w1qp04v2zehJXctW0JPjy",
      externalLink: "https://open.spotify.com/track/0w1qp04v2zehJXctW0JPjy",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Juno",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "juno|74KM79TiuVKeVCqs8QtB0B|223186",
} as const satisfies Track
