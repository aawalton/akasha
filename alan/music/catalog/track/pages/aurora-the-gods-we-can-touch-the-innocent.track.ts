import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheGodsWeCanTouchTheInnocent = {
  id: "01a0b637-f4f1-7c49-92cd-246795fa23d4",
  type: "page-type/track",
  slug: "aurora-the-gods-we-can-touch-the-innocent",
  ownLength: 3.45755,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-gods-we-can-touch"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5oxNpNSkFYi5EDWEuj663I",
      externalLink: "https://open.spotify.com/track/5oxNpNSkFYi5EDWEuj663I",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Innocent",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theinnocent|1WgXqy2Dd70QQOU7Ay074N|207453",
  song: "song/aurora-the-innocent",
} as const satisfies Track
