import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraYourBloodYourBlood = {
  id: "01a0b638-0192-7da3-a88c-30547816e5ac",
  type: "page-type/track",
  slug: "aurora-your-blood-your-blood",
  ownLength: 4.137766666666667,
  ownProgress: 4.137766666666667,
  partOfCollections: ["release/aurora-your-blood"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4QJKtN5EXFtxbqnHuibwEL",
      externalLink: "https://open.spotify.com/track/4QJKtN5EXFtxbqnHuibwEL",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Your Blood",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "yourblood|1WgXqy2Dd70QQOU7Ay074N|248266",
  song: "song/aurora-your-blood",
  carriedBy: [
    {
      release: "release/aurora-your-blood",
      discNumber: 1,
      position: 1,
      externalId: "4QJKtN5EXFtxbqnHuibwEL",
      externalLink: "https://open.spotify.com/track/4QJKtN5EXFtxbqnHuibwEL",
    },
  ],
} as const satisfies Track
