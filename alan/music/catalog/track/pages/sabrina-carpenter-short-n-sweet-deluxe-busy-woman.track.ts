import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeBusyWoman = {
  id: "01a0b111-1f0c-765f-bea6-bcc754f00fbb",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-busy-woman",
  ownLength: 3.1102,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0b0Dz0Gi86SVdBxYeiQcCP",
      externalLink: "https://open.spotify.com/track/0b0Dz0Gi86SVdBxYeiQcCP",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Busy Woman",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "busywoman|74KM79TiuVKeVCqs8QtB0B|186612",
} as const satisfies Track
