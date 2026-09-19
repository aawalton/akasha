import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheGodsWeCanTouchHeathens = {
  id: "01a0b637-f4c9-7b32-85d0-52e1939d1945",
  type: "page-type/track",
  slug: "aurora-the-gods-we-can-touch-heathens",
  ownLength: 3.75155,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-gods-we-can-touch"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1wtFmvGQtqWahPLVTlrr0K",
      externalLink: "https://open.spotify.com/track/1wtFmvGQtqWahPLVTlrr0K",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Heathens",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "heathens|1WgXqy2Dd70QQOU7Ay074N|225093",
  song: "song/aurora-heathens",
} as const satisfies Track
