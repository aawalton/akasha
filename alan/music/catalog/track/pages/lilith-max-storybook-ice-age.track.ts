import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxStorybookIceAge = {
  id: "01a0c95e-0124-76ce-802f-660c9da9a89d",
  type: "page-type/track",
  slug: "lilith-max-storybook-ice-age",
  ownLength: 3.1403,
  ownProgress: 0,
  partOfCollections: ["release/lilith-max-storybook"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Ice Age",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "iceage|797SPxZf82IYq3XCM8c9AM|188418",
  song: "song/lilith-max-ice-age",
  carriedBy: [
    {
      release: "release/lilith-max-storybook",
      discNumber: 1,
      position: 3,
      externalId: "3x0BrPnK9wknW5LrYPnB1D",
      externalLink: "https://open.spotify.com/track/3x0BrPnK9wknW5LrYPnB1D",
    },
  ],
} as const satisfies Track
