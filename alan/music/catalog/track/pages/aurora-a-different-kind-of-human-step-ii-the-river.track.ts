import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiTheRiver = {
  id: "01a0b637-f89d-757c-a1bf-56918f913974",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-the-river",
  ownLength: 3.6308833333333332,
  ownProgress: 0,
  partOfCollections: ["release/aurora-a-different-kind-of-human-step-ii"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ZsHvQod9SZINFwmrAeQtg",
      externalLink: "https://open.spotify.com/track/3ZsHvQod9SZINFwmrAeQtg",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The River",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theriver|1WgXqy2Dd70QQOU7Ay074N|217853",
  song: "song/aurora-the-river",
} as const satisfies Track
