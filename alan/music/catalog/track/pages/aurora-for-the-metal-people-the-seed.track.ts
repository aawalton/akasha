import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraForTheMetalPeopleTheSeed = {
  id: "01a0b638-0692-7c8e-ada6-ce4b06b168a4",
  type: "page-type/track",
  slug: "aurora-for-the-metal-people-the-seed",
  ownLength: 4.449483333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-for-the-metal-people"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2HIkVjn7Mttukqxz7KQxlP",
      externalLink: "https://open.spotify.com/track/2HIkVjn7Mttukqxz7KQxlP",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Seed",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theseed|1WgXqy2Dd70QQOU7Ay074N|266969",
} as const satisfies Track
