import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxStorybookTheCautionaryTale = {
  id: "01a0c95e-0178-7f0a-9e8c-592852d1e0d0",
  type: "page-type/track",
  slug: "lilith-max-storybook-the-cautionary-tale",
  ownLength: 3.7836166666666666,
  ownProgress: 0,
  partOfCollections: ["release/lilith-max-storybook"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Cautionary Tale",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "thecautionarytale|797SPxZf82IYq3XCM8c9AM|227017",
  song: "song/lilith-max-the-cautionary-tale",
  carriedBy: [
    {
      release: "release/lilith-max-storybook",
      discNumber: 1,
      position: 5,
      externalId: "3mKQbvEaZdGnuWdSMc4XmF",
      externalLink: "https://open.spotify.com/track/3mKQbvEaZdGnuWdSMc4XmF",
    },
  ],
} as const satisfies Track
