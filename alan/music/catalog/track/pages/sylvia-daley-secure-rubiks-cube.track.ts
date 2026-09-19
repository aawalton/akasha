import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sylviaDaleySecureRubiksCube = {
  id: "01a0a6c3-6dc2-7bbd-bf64-fff8c71b8c88",
  type: "page-type/track",
  slug: "sylvia-daley-secure-rubiks-cube",
  ownLength: 2.5339833333333335,
  ownProgress: 0,
  partOfCollections: ["release/sylvia-daley-secure"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1EWrZHshF5WBgyLgO52VXo",
      externalLink: "https://open.spotify.com/track/1EWrZHshF5WBgyLgO52VXo",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Rubik's Cube",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "03dXd2zBbBJvX60Oap8Lgo", artistName: "Sylvia Daley" }],
  trackKey: "rubikscube|03dXd2zBbBJvX60Oap8Lgo|152039",
  song: "song/sylvia-daley-rubiks-cube",
} as const satisfies Track
