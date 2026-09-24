import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxMakingsOfAGodOrion = {
  id: "01a0c95d-fd30-7769-a142-b0cc7c75d8f1",
  type: "page-type/track",
  slug: "lilith-max-makings-of-a-god-orion",
  ownLength: 2.775516666666667,
  ownProgress: 2.775516666666667,
  partOfCollections: ["release/lilith-max-makings-of-a-god", "release/lilith-max-orion"],
  status: "completed",
  unit: "unit/minutes",
  title: "Orion",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/lilith-max" }],
  trackKey: "orion|797SPxZf82IYq3XCM8c9AM|166531",
  song: "song/lilith-max-orion",
  carriedBy: [
    {
      release: "release/lilith-max-makings-of-a-god",
      discNumber: 1,
      position: 2,
      externalId: "1lCgtcS5VdRHuXZdsO6cbV",
      externalLink: "https://open.spotify.com/track/1lCgtcS5VdRHuXZdsO6cbV",
    },
    {
      release: "release/lilith-max-orion",
      discNumber: 1,
      position: 1,
      externalId: "6BRPqICKk2LCjJCk97EuQv",
      externalLink: "https://open.spotify.com/track/6BRPqICKk2LCjJCk97EuQv",
    },
  ],
} as const satisfies Track
