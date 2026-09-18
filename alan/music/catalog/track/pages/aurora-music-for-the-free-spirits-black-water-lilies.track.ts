import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraMusicForTheFreeSpiritsBlackWaterLilies = {
  id: "01a0b638-0863-7fe6-989e-78741f5b0640",
  type: "page-type/track",
  slug: "aurora-music-for-the-free-spirits-black-water-lilies",
  ownLength: 4.714,
  ownProgress: 0,
  partOfCollections: ["release/aurora-music-for-the-free-spirits"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2S9LrtRLhwGENhHWUIwKVN",
      externalLink: "https://open.spotify.com/track/2S9LrtRLhwGENhHWUIwKVN",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Black Water Lilies",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "blackwaterlilies|1WgXqy2Dd70QQOU7Ay074N|282840",
} as const satisfies Track
