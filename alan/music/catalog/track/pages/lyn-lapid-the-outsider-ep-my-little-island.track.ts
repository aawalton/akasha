import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidTheOutsiderEpMyLittleIsland = {
  id: "01a0c95e-c08f-73dd-bea5-cf0f42b3cad7",
  type: "page-type/track",
  slug: "lyn-lapid-the-outsider-ep-my-little-island",
  ownLength: 3.1553333333333335,
  ownProgress: 0,
  partOfCollections: ["release/lyn-lapid-the-outsider-ep"],
  status: "not-started",
  unit: "unit/minutes",
  title: "My Little Island",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "mylittleisland|4pfy05cNNTacuOQ6SiSu4v|189320",
  song: "song/lyn-lapid-my-little-island",
  carriedBy: [
    {
      release: "release/lyn-lapid-the-outsider-ep",
      discNumber: 1,
      position: 6,
      externalId: "09cWMixCAoFoFMmegG4wqf",
      externalLink: "https://open.spotify.com/track/09cWMixCAoFoFMmegG4wqf",
    },
  ],
} as const satisfies Track
