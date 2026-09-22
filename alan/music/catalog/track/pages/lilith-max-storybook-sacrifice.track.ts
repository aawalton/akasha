import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxStorybookSacrifice = {
  id: "01a0c95e-00fa-75e2-ab46-0ae5cb3564b6",
  type: "page-type/track",
  slug: "lilith-max-storybook-sacrifice",
  ownLength: 3.0166666666666666,
  ownProgress: 0,
  partOfCollections: ["release/lilith-max-storybook"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Sacrifice",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "sacrifice|797SPxZf82IYq3XCM8c9AM|181000",
  song: "song/lilith-max-sacrifice",
  carriedBy: [
    {
      release: "release/lilith-max-storybook",
      discNumber: 1,
      position: 2,
      externalId: "1XsQAAtee8WdMibpMH1xLt",
      externalLink: "https://open.spotify.com/track/1XsQAAtee8WdMibpMH1xLt",
    },
  ],
} as const satisfies Track
