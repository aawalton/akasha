import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiDanceOnTheMoon = {
  id: "01a0b637-f8eb-7868-9a11-856e6f4f5c92",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-dance-on-the-moon",
  ownLength: 3.6049,
  ownProgress: 0,
  partOfCollections: ["release/aurora-a-different-kind-of-human-step-ii"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4isOzW5MBwEI7RenDclFBx",
      externalLink: "https://open.spotify.com/track/4isOzW5MBwEI7RenDclFBx",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Dance On The Moon",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "danceonthemoon|1WgXqy2Dd70QQOU7Ay074N|216294",
  song: "song/aurora-dance-on-the-moon",
} as const satisfies Track
