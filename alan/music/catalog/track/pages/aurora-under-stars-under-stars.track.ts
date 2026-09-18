import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraUnderStarsUnderStars = {
  id: "01a0b638-1256-73c3-ba4f-4706d408ee08",
  type: "page-type/track",
  slug: "aurora-under-stars-under-stars",
  ownLength: 3.3171,
  ownProgress: 0,
  partOfCollections: ["release/aurora-under-stars"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2LFgK4Uk09LgP6Ta0ne8YF",
      externalLink: "https://open.spotify.com/track/2LFgK4Uk09LgP6Ta0ne8YF",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Under Stars",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "understars|1WgXqy2Dd70QQOU7Ay074N|199026",
} as const satisfies Track
