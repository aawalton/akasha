import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraHalfTheWorldAwayHalfTheWorldAway = {
  id: "01a0b638-1138-76c1-881e-2b19b39513d0",
  type: "page-type/track",
  slug: "aurora-half-the-world-away-half-the-world-away",
  ownLength: 3.302216666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-half-the-world-away"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1YiGzpKfesDgYODFyxmjcE",
      externalLink: "https://open.spotify.com/track/1YiGzpKfesDgYODFyxmjcE",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Half the World Away",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "halftheworldaway|1WgXqy2Dd70QQOU7Ay074N|198133",
  song: "song/aurora-half-the-world-away",
} as const satisfies Track
