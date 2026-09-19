import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheRiverAskjellRemixTheRiver = {
  id: "01a0b638-0f7b-74ef-a862-d07ab9fb9528",
  type: "page-type/track",
  slug: "aurora-the-river-askjell-remix-the-river",
  ownLength: 3.6308833333333332,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-river-askjell-remix"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5UTa5NNuq3kyPz8BoTBJpt",
      externalLink: "https://open.spotify.com/track/5UTa5NNuq3kyPz8BoTBJpt",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The River",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theriver|1WgXqy2Dd70QQOU7Ay074N|217853",
  song: "song/aurora-the-river",
} as const satisfies Track
