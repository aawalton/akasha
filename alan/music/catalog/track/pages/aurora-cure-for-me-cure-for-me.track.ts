import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraCureForMeCureForMe = {
  id: "01a0b638-022d-7caf-9d8a-34ce2227bd52",
  type: "page-type/track",
  slug: "aurora-cure-for-me-cure-for-me",
  ownLength: 3.3606666666666665,
  ownProgress: 3.3606666666666665,
  partOfCollections: ["release/aurora-cure-for-me"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5suiloWwRiQdhFeb9YSGQT",
      externalLink: "https://open.spotify.com/track/5suiloWwRiQdhFeb9YSGQT",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Cure For Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "cureforme|1WgXqy2Dd70QQOU7Ay074N|201640",
  song: "song/aurora-cure-for-me",
  carriedBy: [
    {
      release: "release/aurora-cure-for-me",
      discNumber: 1,
      position: 1,
      externalId: "5suiloWwRiQdhFeb9YSGQT",
      externalLink: "https://open.spotify.com/track/5suiloWwRiQdhFeb9YSGQT",
    },
  ],
} as const satisfies Track
