import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OctoberRoadSpecialEditionDontLetMeBeLonelyTonight = {
  id: "01a0abeb-3970-79b3-b384-fdf5bd6fbd0c",
  type: "page-type/track",
  slug: "james-taylor-2-october-road-special-edition-dont-let-me-be-lonely-tonight",
  ownLength: 4.71555,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-october-road-special-edition"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6K7JqasElx9wkiCjrh3YCl",
      externalLink: "https://open.spotify.com/track/6K7JqasElx9wkiCjrh3YCl",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Don't Let Me Be Lonely Tonight",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
    { externalId: "5IkynsVZoak9UR2Xt8qsMj", artistName: "Michael Brecker" },
  ],
  trackKey: "dontletmebelonelytonight|0vn7UBvSQECKJm2817Yf1P,5IkynsVZoak9UR2Xt8qsMj|282933",
  song: "song/james-taylor-dont-let-me-be-lonely-tonight",
} as const satisfies Track
