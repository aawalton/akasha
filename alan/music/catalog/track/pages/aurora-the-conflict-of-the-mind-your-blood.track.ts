import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheConflictOfTheMindYourBlood = {
  id: "01a0b638-016a-7825-a78e-75498765de7a",
  type: "page-type/track",
  slug: "aurora-the-conflict-of-the-mind-your-blood",
  ownLength: 4.137766666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-conflict-of-the-mind"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1kiLhVtNkuBgsbOBtaXzaL",
      externalLink: "https://open.spotify.com/track/1kiLhVtNkuBgsbOBtaXzaL",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Your Blood",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "yourblood|1WgXqy2Dd70QQOU7Ay074N|248266",
  song: "song/aurora-your-blood",
} as const satisfies Track
