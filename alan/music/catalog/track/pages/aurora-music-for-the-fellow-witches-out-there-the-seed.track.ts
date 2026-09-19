import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraMusicForTheFellowWitchesOutThereTheSeed = {
  id: "01a0b638-09f0-74cf-ad0e-39447b73beaa",
  type: "page-type/track",
  slug: "aurora-music-for-the-fellow-witches-out-there-the-seed",
  ownLength: 4.449483333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-music-for-the-fellow-witches-out-there"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4IYFiPBWwI6XTtBPINAi9X",
      externalLink: "https://open.spotify.com/track/4IYFiPBWwI6XTtBPINAi9X",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Seed",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theseed|1WgXqy2Dd70QQOU7Ay074N|266969",
  song: "song/aurora-the-seed",
} as const satisfies Track
