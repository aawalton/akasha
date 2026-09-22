import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxStardustStardust = {
  id: "01a0c95e-01e0-7b2e-a9b4-38c7e359092b",
  type: "page-type/track",
  slug: "lilith-max-stardust-stardust",
  ownLength: 3.414833333333333,
  ownProgress: 3.414833333333333,
  partOfCollections: ["release/lilith-max-stardust"],
  status: "completed",
  unit: "unit/minutes",
  title: "Stardust",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "stardust|797SPxZf82IYq3XCM8c9AM|204890",
  song: "song/lilith-max-stardust",
  carriedBy: [
    {
      release: "release/lilith-max-stardust",
      discNumber: 1,
      position: 1,
      externalId: "6Ho36PEEDD4vYJppba6PuV",
      externalLink: "https://open.spotify.com/track/6Ho36PEEDD4vYJppba6PuV",
    },
  ],
} as const satisfies Track
