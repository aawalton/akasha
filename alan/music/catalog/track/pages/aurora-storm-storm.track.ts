import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraStormStorm = {
  id: "01a0b638-0358-76e1-989c-cf9b535832d9",
  type: "page-type/track",
  slug: "aurora-storm-storm",
  ownLength: 3.7948,
  ownProgress: 3.7948,
  partOfCollections: ["release/aurora-storm"],
  status: "completed",
  unit: "unit/minutes",
  title: "Storm",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "吳青峰" }, { artist: "artist/aurora" }],
  trackKey: "storm|1WgXqy2Dd70QQOU7Ay074N,5a5vu4RzsAHdKN0aYyblZ8|227688",
  song: "song/aurora-storm",
  carriedBy: [
    {
      release: "release/aurora-storm",
      discNumber: 1,
      position: 1,
      externalId: "7AsYl5LgI6yHEGNnXZYQO4",
      externalLink: "https://open.spotify.com/track/7AsYl5LgI6yHEGNnXZYQO4",
    },
  ],
} as const satisfies Track
