import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxePleasePleasePleaseFeatDollyParton = {
  id: "01a0b111-1ecc-7f28-90cf-87f5a667b451",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-please-please-please-feat-dolly-parton",
  ownLength: 3.0689333333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6nrSo5ZWhsai0oeX257rRF",
      externalLink: "https://open.spotify.com/track/6nrSo5ZWhsai0oeX257rRF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Please Please Please (feat. Dolly Parton)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "32vWCbZh0xZ4o9gkz4PsEU", artistName: "Dolly Parton" },
  ],
  trackKey:
    "pleasepleasepleasefeatdollyparton|32vWCbZh0xZ4o9gkz4PsEU,74KM79TiuVKeVCqs8QtB0B|184136",
  song: "song/sabrina-carpenter-please-please-please",
} as const satisfies Track
