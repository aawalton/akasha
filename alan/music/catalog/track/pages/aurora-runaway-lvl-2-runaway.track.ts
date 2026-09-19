import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRunawayLvl2Runaway = {
  id: "01a0b638-0575-7259-936b-90ccb0577c3b",
  type: "page-type/track",
  slug: "aurora-runaway-lvl-2-runaway",
  ownLength: 4.1471,
  ownProgress: 0,
  partOfCollections: ["release/aurora-runaway-lvl-2"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5RvocZnqXvVjkhG0zT7NGg",
      externalLink: "https://open.spotify.com/track/5RvocZnqXvVjkhG0zT7NGg",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Runaway",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "runaway|1WgXqy2Dd70QQOU7Ay074N|248826",
  song: "song/aurora-runaway",
} as const satisfies Track
