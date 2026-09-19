import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraMusicForTheFreeSpiritsDanceOnTheMoon = {
  id: "01a0b638-088f-756e-9eef-bfd2eaa10b88",
  type: "page-type/track",
  slug: "aurora-music-for-the-free-spirits-dance-on-the-moon",
  ownLength: 3.6049,
  ownProgress: 0,
  partOfCollections: ["release/aurora-music-for-the-free-spirits"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Z1UyqikbyfLhkwt7q8l8l",
      externalLink: "https://open.spotify.com/track/2Z1UyqikbyfLhkwt7q8l8l",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Dance On The Moon",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "danceonthemoon|1WgXqy2Dd70QQOU7Ay074N|216294",
  song: "song/aurora-dance-on-the-moon",
} as const satisfies Track
