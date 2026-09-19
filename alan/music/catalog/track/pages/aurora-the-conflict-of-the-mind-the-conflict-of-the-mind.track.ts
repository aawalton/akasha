import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheConflictOfTheMindTheConflictOfTheMind = {
  id: "01a0b638-0142-7c8f-808d-b19eec18ff46",
  type: "page-type/track",
  slug: "aurora-the-conflict-of-the-mind-the-conflict-of-the-mind",
  ownLength: 4.263333333333334,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-conflict-of-the-mind"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4BFYRUjuuesHjLTJdvo1XR",
      externalLink: "https://open.spotify.com/track/4BFYRUjuuesHjLTJdvo1XR",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Conflict of the Mind",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theconflictofthemind|1WgXqy2Dd70QQOU7Ay074N|255800",
  song: "song/aurora-the-conflict-of-the-mind",
} as const satisfies Track
