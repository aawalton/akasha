import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysAutumnOnPianoShapeOfMyHeart = {
  id: "01a0afa1-bfc4-7297-b523-b9146dcf9d22",
  type: "page-type/track",
  slug: "the-piano-guys-autumn-on-piano-shape-of-my-heart",
  ownLength: 5.093633333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-autumn-on-piano"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5LcMQmnppDuTGIUzPIIDLm",
      externalLink: "https://open.spotify.com/track/5LcMQmnppDuTGIUzPIIDLm",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Shape Of My Heart",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "shapeofmyheart|0jW6R8CVyVohuUJVcuweDI|305618",
} as const satisfies Track
