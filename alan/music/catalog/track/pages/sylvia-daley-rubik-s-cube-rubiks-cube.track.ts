import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sylviaDaleyRubikSCubeRubiksCube = {
  id: "01a0a6c3-6f5f-7c1a-9f2a-d4cc290ddcbb",
  type: "page-type/track",
  slug: "sylvia-daley-rubik-s-cube-rubiks-cube",
  ownLength: 2.5339833333333335,
  ownProgress: 2.5339833333333335,
  partOfCollections: ["release/sylvia-daley-rubik-s-cube", "release/sylvia-daley-secure"],
  status: "completed",
  unit: "unit/minutes",
  title: "Rubik's Cube",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sylvia-daley" }],
  trackKey: "rubikscube|03dXd2zBbBJvX60Oap8Lgo|152039",
  song: "song/sylvia-daley-rubiks-cube",
  carriedBy: [
    {
      release: "release/sylvia-daley-rubik-s-cube",
      discNumber: 1,
      position: 1,
      externalId: "1MMxAQ4nxkNdCzai0UdlPq",
      externalLink: "https://open.spotify.com/track/1MMxAQ4nxkNdCzai0UdlPq",
    },
    {
      release: "release/sylvia-daley-secure",
      discNumber: 1,
      position: 2,
      externalId: "1EWrZHshF5WBgyLgO52VXo",
      externalLink: "https://open.spotify.com/track/1EWrZHshF5WBgyLgO52VXo",
    },
  ],
} as const satisfies Track
