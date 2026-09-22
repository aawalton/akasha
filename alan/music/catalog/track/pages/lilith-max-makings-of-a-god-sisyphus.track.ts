import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxMakingsOfAGodSisyphus = {
  id: "01a0c95d-fcd2-7fd2-be23-726e43d64c4b",
  type: "page-type/track",
  slug: "lilith-max-makings-of-a-god-sisyphus",
  ownLength: 3.256883333333333,
  ownProgress: 3.256883333333333,
  partOfCollections: ["release/lilith-max-makings-of-a-god"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sisyphus",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "sisyphus|797SPxZf82IYq3XCM8c9AM|195413",
  song: "song/lilith-max-sisyphus",
  carriedBy: [
    {
      release: "release/lilith-max-makings-of-a-god",
      discNumber: 1,
      position: 4,
      externalId: "0qtxeMm0WpYVZAh9km0uuj",
      externalLink: "https://open.spotify.com/track/0qtxeMm0WpYVZAh9km0uuj",
    },
  ],
} as const satisfies Track
