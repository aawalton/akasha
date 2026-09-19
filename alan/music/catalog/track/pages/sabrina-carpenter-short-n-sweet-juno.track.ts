import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetJuno = {
  id: "01a0b111-20be-776e-a3b4-606720acdfee",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-juno",
  ownLength: 3.719866666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "21B4gaTWnTkuSh77iWEXdS",
      externalLink: "https://open.spotify.com/track/21B4gaTWnTkuSh77iWEXdS",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Juno",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "juno|74KM79TiuVKeVCqs8QtB0B|223192",
  song: "song/sabrina-carpenter-juno",
} as const satisfies Track
