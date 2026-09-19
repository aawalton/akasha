import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoShapeOfMyHeart = {
  id: "01a0afa1-cb43-7538-a80e-d662dd0c3fac",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-shape-of-my-heart",
  ownLength: 5.093633333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0wWsp2yaL72U4aD9tDaCPf",
      externalLink: "https://open.spotify.com/track/0wWsp2yaL72U4aD9tDaCPf",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Shape Of My Heart",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "shapeofmyheart|0jW6R8CVyVohuUJVcuweDI|305618",
  song: "song/the-piano-guys-shape-of-my-heart",
} as const satisfies Track
