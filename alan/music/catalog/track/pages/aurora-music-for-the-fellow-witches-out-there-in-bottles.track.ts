import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraMusicForTheFellowWitchesOutThereInBottles = {
  id: "01a0b638-0999-7b59-96b6-60e3d62060d1",
  type: "page-type/track",
  slug: "aurora-music-for-the-fellow-witches-out-there-in-bottles",
  ownLength: 3.969533333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-music-for-the-fellow-witches-out-there"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "79h8I47oSCgNwjfw3e4kLk",
      externalLink: "https://open.spotify.com/track/79h8I47oSCgNwjfw3e4kLk",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "In Bottles",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "inbottles|1WgXqy2Dd70QQOU7Ay074N|238172",
  song: "song/aurora-in-bottles",
} as const satisfies Track
