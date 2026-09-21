import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OctoberRoadSpecialEditionDontLetMeBeLonelyTonight = {
  id: "01a0abeb-3970-79b3-b384-fdf5bd6fbd0c",
  type: "page-type/track",
  slug: "james-taylor-2-october-road-special-edition-dont-let-me-be-lonely-tonight",
  ownLength: 4.71555,
  ownProgress: 4.71555,
  partOfCollections: ["release/james-taylor-2-october-road-special-edition"],
  status: "completed",
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
  explicit: false,
  trackArtist: [
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
    { externalId: "5IkynsVZoak9UR2Xt8qsMj", artistName: "Michael Brecker" },
  ],
  trackKey: "dontletmebelonelytonight|0vn7UBvSQECKJm2817Yf1P,5IkynsVZoak9UR2Xt8qsMj|282933",
  song: "song/james-taylor-dont-let-me-be-lonely-tonight",
  carriedBy: [
    {
      release: "release/james-taylor-2-october-road-special-edition",
      discNumber: 1,
      position: 13,
      externalId: "6K7JqasElx9wkiCjrh3YCl",
      externalLink: "https://open.spotify.com/track/6K7JqasElx9wkiCjrh3YCl",
    },
  ],
} as const satisfies Track
