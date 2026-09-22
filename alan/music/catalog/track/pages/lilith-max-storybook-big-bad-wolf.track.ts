import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxStorybookBigBadWolf = {
  id: "01a0c95e-00c2-7206-844e-7534755ccdfd",
  type: "page-type/track",
  slug: "lilith-max-storybook-big-bad-wolf",
  ownLength: 3.76245,
  ownProgress: 3.76245,
  partOfCollections: ["release/lilith-max-storybook"],
  status: "completed",
  unit: "unit/minutes",
  title: "Big Bad Wolf",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "bigbadwolf|797SPxZf82IYq3XCM8c9AM|225747",
  song: "song/lilith-max-big-bad-wolf",
  carriedBy: [
    {
      release: "release/lilith-max-storybook",
      discNumber: 1,
      position: 1,
      externalId: "6qPFg0gwcPqUecSFh8djJJ",
      externalLink: "https://open.spotify.com/track/6qPFg0gwcPqUecSFh8djJJ",
    },
  ],
} as const satisfies Track
