import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const ejaeInAnotherWorldInAnotherWorld = {
  id: "01a0d3ab-2392-70c4-8c08-63930129b6e0",
  type: "page-type/track",
  slug: "ejae-in-another-world-in-another-world",
  ownLength: 2.9255166666666668,
  ownProgress: 0,
  partOfCollections: ["release/ejae-in-another-world"],
  status: "not-started",
  unit: "unit/minutes",
  title: "In Another World",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0RMJOzHDhAKY1o2j0W0vxY", artistName: "EJAE" }],
  trackKey: "inanotherworld|0RMJOzHDhAKY1o2j0W0vxY|175531",
  song: "song/ejae-in-another-world",
  carriedBy: [
    {
      release: "release/ejae-in-another-world",
      discNumber: 1,
      position: 1,
      externalId: "2TTTiaXJZJn7y4ZC6YGXlv",
      externalLink: "https://open.spotify.com/track/2TTTiaXJZJn7y4ZC6YGXlv",
    },
  ],
} as const satisfies Track
