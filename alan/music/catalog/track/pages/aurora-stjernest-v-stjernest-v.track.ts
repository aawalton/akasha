import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraStjernestVStjernestV = {
  id: "01a0b638-0b72-7427-a12b-e012af0925e1",
  type: "page-type/track",
  slug: "aurora-stjernest-v-stjernest-v",
  ownLength: 3.30075,
  ownProgress: 3.30075,
  partOfCollections: ["release/aurora-stjernest-v"],
  status: "completed",
  unit: "unit/minutes",
  title: "Stjernestøv",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "stjernestv|1WgXqy2Dd70QQOU7Ay074N|198045",
  song: "song/aurora-stjernest-v",
  carriedBy: [
    {
      release: "release/aurora-stjernest-v",
      discNumber: 1,
      position: 1,
      externalId: "2g7kOfDm0QfGHICnvJfP0e",
      externalLink: "https://open.spotify.com/track/2g7kOfDm0QfGHICnvJfP0e",
    },
  ],
} as const satisfies Track
