import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SoloCaptainH = {
  id: "01a0abea-6aa9-76c5-8935-df9238d03ceb",
  type: "page-type/track",
  slug: "celtic-woman-2-solo-captain-h",
  ownLength: 3.0422,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-solo"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Gwxm3rH2fdIZqrfM7JhtA",
      externalLink: "https://open.spotify.com/track/5Gwxm3rH2fdIZqrfM7JhtA",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Captain H",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0gPFpb7bIqk1nyr0m75g7s", artistName: "Mairead" }],
  trackKey: "captainh|0gPFpb7bIqk1nyr0m75g7s|182532",
  song: "song/celtic-woman-captain-h",
} as const satisfies Track
