import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidInMyMindInfinite = {
  id: "01a0c95e-c505-790f-b359-cc70b9720243",
  type: "page-type/track",
  slug: "lyn-lapid-in-my-mind-infinite",
  ownLength: 3.7906,
  ownProgress: 3.7906,
  partOfCollections: ["release/lyn-lapid-in-my-mind", "release/lyn-lapid-infinite"],
  status: "completed",
  unit: "unit/minutes",
  title: "Infinite",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "infinite|4pfy05cNNTacuOQ6SiSu4v|227436",
  song: "song/lyn-lapid-infinite",
  carriedBy: [
    {
      release: "release/lyn-lapid-in-my-mind",
      discNumber: 1,
      position: 2,
      externalId: "3PUuswUzfWwSWnjT8TNEyN",
      externalLink: "https://open.spotify.com/track/3PUuswUzfWwSWnjT8TNEyN",
    },
    {
      release: "release/lyn-lapid-infinite",
      discNumber: 1,
      position: 1,
      externalId: "3KmHnBlmfQuQu4hyh1eggd",
      externalLink: "https://open.spotify.com/track/3KmHnBlmfQuQu4hyh1eggd",
    },
  ],
} as const satisfies Track
