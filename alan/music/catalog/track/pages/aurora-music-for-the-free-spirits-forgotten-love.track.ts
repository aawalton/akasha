import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraMusicForTheFreeSpiritsForgottenLove = {
  id: "01a0b638-08ea-736a-b0d5-8499b425f5de",
  type: "page-type/track",
  slug: "aurora-music-for-the-free-spirits-forgotten-love",
  ownLength: 3.44115,
  ownProgress: 0,
  partOfCollections: ["release/aurora-music-for-the-free-spirits"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2SMINEktkFpOB4goizKsi6",
      externalLink: "https://open.spotify.com/track/2SMINEktkFpOB4goizKsi6",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Forgotten Love",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "forgottenlove|1WgXqy2Dd70QQOU7Ay074N|206469",
  song: "song/aurora-forgotten-love",
} as const satisfies Track
