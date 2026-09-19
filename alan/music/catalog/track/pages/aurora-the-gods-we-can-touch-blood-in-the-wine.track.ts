import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheGodsWeCanTouchBloodInTheWine = {
  id: "01a0b637-f5b1-7b9d-98b0-c5481f64fcd3",
  type: "page-type/track",
  slug: "aurora-the-gods-we-can-touch-blood-in-the-wine",
  ownLength: 3.4993333333333334,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-gods-we-can-touch"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "76cIh6IWGLs4GNlg8RC4vC",
      externalLink: "https://open.spotify.com/track/76cIh6IWGLs4GNlg8RC4vC",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Blood In The Wine",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "bloodinthewine|1WgXqy2Dd70QQOU7Ay074N|209960",
  song: "song/aurora-blood-in-the-wine",
} as const satisfies Track
