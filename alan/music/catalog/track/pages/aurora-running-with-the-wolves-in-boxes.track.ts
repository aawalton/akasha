import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRunningWithTheWolvesInBoxes = {
  id: "01a0b638-11b1-72fe-9dfc-baa9c5c44a13",
  type: "page-type/track",
  slug: "aurora-running-with-the-wolves-in-boxes",
  ownLength: 3.394433333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-running-with-the-wolves"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3MwSRWz6R18tOMXsNveaBV",
      externalLink: "https://open.spotify.com/track/3MwSRWz6R18tOMXsNveaBV",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "In Boxes",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "inboxes|1WgXqy2Dd70QQOU7Ay074N|203666",
} as const satisfies Track
