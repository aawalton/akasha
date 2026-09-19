import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeAlrightToBeAlright = {
  id: "01a0b637-ffe4-7b35-9547-deaec748df1c",
  type: "page-type/track",
  slug: "aurora-to-be-alright-to-be-alright",
  ownLength: 4.094,
  ownProgress: 0,
  partOfCollections: ["release/aurora-to-be-alright"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5E0mDkJAiKziakTFbCjaaT",
      externalLink: "https://open.spotify.com/track/5E0mDkJAiKziakTFbCjaaT",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "To Be Alright",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "tobealright|1WgXqy2Dd70QQOU7Ay074N|245640",
  song: "song/aurora-to-be-alright",
} as const satisfies Track
