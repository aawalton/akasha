import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiTheSeed = {
  id: "01a0b637-f9f7-7366-bb40-9a5dd2e9fa1a",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-the-seed",
  ownLength: 4.449483333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-a-different-kind-of-human-step-ii"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3EUXLUKx2zNUzb2otMc8HH",
      externalLink: "https://open.spotify.com/track/3EUXLUKx2zNUzb2otMc8HH",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Seed",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theseed|1WgXqy2Dd70QQOU7Ay074N|266969",
  song: "song/aurora-the-seed",
} as const satisfies Track
