import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetPleasePleasePlease = {
  id: "01a0b111-1f7d-7475-8a83-e980a51f9793",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-please-please-please",
  ownLength: 3.1060833333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2tHwzyyOLoWSFqYNjeVMzj",
      externalLink: "https://open.spotify.com/track/2tHwzyyOLoWSFqYNjeVMzj",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Please Please Please",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "pleasepleaseplease|74KM79TiuVKeVCqs8QtB0B|186365",
  song: "song/sabrina-carpenter-please-please-please",
} as const satisfies Track
