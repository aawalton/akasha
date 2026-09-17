import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingShapeOfMyHeart = {
  id: "01a0afa1-c9cf-725a-a4a5-55e437f4d442",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-shape-of-my-heart",
  ownLength: 5.093633333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3yqkxelLeIqbCPAIqlhpcN",
      externalLink: "https://open.spotify.com/track/3yqkxelLeIqbCPAIqlhpcN",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Shape Of My Heart",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "shapeofmyheart|0jW6R8CVyVohuUJVcuweDI|305618",
} as const satisfies Track
