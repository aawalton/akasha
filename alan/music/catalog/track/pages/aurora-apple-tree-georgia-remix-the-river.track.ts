import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraAppleTreeGeorgiaRemixTheRiver = {
  id: "01a0b638-0f2a-764e-a8f7-b23827f452ca",
  type: "page-type/track",
  slug: "aurora-apple-tree-georgia-remix-the-river",
  ownLength: 3.6308833333333332,
  ownProgress: 0,
  partOfCollections: ["release/aurora-apple-tree-georgia-remix"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5AoPD50ECugPNfyDBPhF4M",
      externalLink: "https://open.spotify.com/track/5AoPD50ECugPNfyDBPhF4M",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The River",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theriver|1WgXqy2Dd70QQOU7Ay074N|217853",
  song: "song/aurora-the-river",
} as const satisfies Track
