import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidInMyMindInMyMind = {
  id: "01a0c95e-c387-74bd-8418-3473e4d48aa1",
  type: "page-type/track",
  slug: "lyn-lapid-in-my-mind-in-my-mind",
  ownLength: 2.713233333333333,
  ownProgress: 2.713233333333333,
  partOfCollections: ["release/lyn-lapid-in-my-mind"],
  status: "completed",
  unit: "unit/minutes",
  title: "In My Mind",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "inmymind|4pfy05cNNTacuOQ6SiSu4v|162794",
  song: "song/lyn-lapid-in-my-mind",
  carriedBy: [
    {
      release: "release/lyn-lapid-in-my-mind",
      discNumber: 1,
      position: 1,
      externalId: "26mkhlP54iLFzqzmeCXnK5",
      externalLink: "https://open.spotify.com/track/26mkhlP54iLFzqzmeCXnK5",
    },
  ],
} as const satisfies Track
