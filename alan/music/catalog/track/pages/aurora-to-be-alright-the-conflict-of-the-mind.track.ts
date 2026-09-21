import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeAlrightTheConflictOfTheMind = {
  id: "01a0b638-0030-720f-9fef-480e45111b91",
  type: "page-type/track",
  slug: "aurora-to-be-alright-the-conflict-of-the-mind",
  ownLength: 4.24355,
  ownProgress: 4.24355,
  partOfCollections: ["release/aurora-to-be-alright"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1EUige1Y1Brv1NFMn7D8wR",
      externalLink: "https://open.spotify.com/track/1EUige1Y1Brv1NFMn7D8wR",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Conflict Of The Mind",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theconflictofthemind|1WgXqy2Dd70QQOU7Ay074N|254613",
  song: "song/aurora-the-conflict-of-the-mind",
  carriedBy: [
    {
      release: "release/aurora-to-be-alright",
      discNumber: 1,
      position: 3,
      externalId: "1EUige1Y1Brv1NFMn7D8wR",
      externalLink: "https://open.spotify.com/track/1EUige1Y1Brv1NFMn7D8wR",
    },
  ],
} as const satisfies Track
