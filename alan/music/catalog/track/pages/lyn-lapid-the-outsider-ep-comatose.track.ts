import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidTheOutsiderEpComatose = {
  id: "01a0c95e-bf4c-7098-a7e6-c41210dbdcb7",
  type: "page-type/track",
  slug: "lyn-lapid-the-outsider-ep-comatose",
  ownLength: 2.31555,
  ownProgress: 2.31555,
  partOfCollections: ["release/lyn-lapid-the-outsider-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "Comatose",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "comatose|4pfy05cNNTacuOQ6SiSu4v|138933",
  song: "song/lyn-lapid-comatose",
  carriedBy: [
    {
      release: "release/lyn-lapid-the-outsider-ep",
      discNumber: 1,
      position: 3,
      externalId: "0eV7LR9ZXDEtyHbVo4RGQX",
      externalLink: "https://open.spotify.com/track/0eV7LR9ZXDEtyHbVo4RGQX",
    },
  ],
} as const satisfies Track
