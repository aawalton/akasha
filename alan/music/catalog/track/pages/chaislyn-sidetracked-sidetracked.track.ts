import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const chaislynSidetrackedSidetracked = {
  id: "01a0b9ec-96cc-74ee-bae4-03c971bebc14",
  type: "page-type/track",
  slug: "chaislyn-sidetracked-sidetracked",
  ownLength: 2.9923,
  ownProgress: 2.9923,
  partOfCollections: ["release/chaislyn-sidetracked"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "649ukvV0AAe4KetOfP9vY9",
      externalLink: "https://open.spotify.com/track/649ukvV0AAe4KetOfP9vY9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sidetracked",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "3zmbniiciaBAJlSX1Bzq9R", artistName: "Chaislyn" }],
  trackKey: "sidetracked|3zmbniiciaBAJlSX1Bzq9R|179538",
  song: "song/chaislyn-sidetracked",
  carriedBy: [
    {
      release: "release/chaislyn-sidetracked",
      discNumber: 1,
      position: 1,
      externalId: "649ukvV0AAe4KetOfP9vY9",
      externalLink: "https://open.spotify.com/track/649ukvV0AAe4KetOfP9vY9",
    },
  ],
} as const satisfies Track
