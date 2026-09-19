import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheGodsWeCanTouchEverythingMatters = {
  id: "01a0b637-f402-7c7d-a3df-c248ad91ac02",
  type: "page-type/track",
  slug: "aurora-the-gods-we-can-touch-everything-matters",
  ownLength: 3.5651,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-gods-we-can-touch"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4X00YoOQUD49hwdXmWBXHM",
      externalLink: "https://open.spotify.com/track/4X00YoOQUD49hwdXmWBXHM",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Everything Matters",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "6e3pZKXUxrPfnUPJ960Hd9", artistName: "Pomme" },
  ],
  trackKey: "everythingmatters|1WgXqy2Dd70QQOU7Ay074N,6e3pZKXUxrPfnUPJ960Hd9|213906",
  song: "song/aurora-everything-matters",
} as const satisfies Track
