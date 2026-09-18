import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRunawayGuitarAcousticRunaway = {
  id: "01a0b638-0638-7380-ac48-aa01a9a68e7d",
  type: "page-type/track",
  slug: "aurora-runaway-guitar-acoustic-runaway",
  ownLength: 4.1471,
  ownProgress: 0,
  partOfCollections: ["release/aurora-runaway-guitar-acoustic"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Z6CB1bJFei9Zy1alI5j48",
      externalLink: "https://open.spotify.com/track/6Z6CB1bJFei9Zy1alI5j48",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Runaway",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "runaway|1WgXqy2Dd70QQOU7Ay074N|248826",
} as const satisfies Track
