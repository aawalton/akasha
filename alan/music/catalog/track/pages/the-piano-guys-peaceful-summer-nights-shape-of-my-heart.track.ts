import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsShapeOfMyHeart = {
  id: "01a0afa1-c7ae-7294-98d2-76444746a41c",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-shape-of-my-heart",
  ownLength: 5.093633333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0t0vfptUP7qYfFEIiATjcO",
      externalLink: "https://open.spotify.com/track/0t0vfptUP7qYfFEIiATjcO",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Shape Of My Heart",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "shapeofmyheart|0jW6R8CVyVohuUJVcuweDI|305618",
} as const satisfies Track
