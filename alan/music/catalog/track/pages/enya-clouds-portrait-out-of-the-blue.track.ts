import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaCloudsPortraitOutOfTheBlue = {
  id: "01a0a5b0-29f1-710b-bc1f-7999686c0c04",
  type: "track",
  slug: "enya-clouds-portrait-out-of-the-blue",
  ownLength: 3.19555,
  ownProgress: 0,
  partOfCollections: ["release/enya-clouds"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7lfKr2Ht9I4I3FZa5fNXEt",
      externalLink: "https://open.spotify.com/track/7lfKr2Ht9I4I3FZa5fNXEt",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Portrait (Out of the Blue)",
} as const satisfies Track
