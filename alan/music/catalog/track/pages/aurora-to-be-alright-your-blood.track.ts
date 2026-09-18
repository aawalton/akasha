import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeAlrightYourBlood = {
  id: "01a0b638-0056-7ce1-aa2c-587361640eb8",
  type: "page-type/track",
  slug: "aurora-to-be-alright-your-blood",
  ownLength: 4.124883333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-to-be-alright"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0yumrjXIijfMWA9zowYxwi",
      externalLink: "https://open.spotify.com/track/0yumrjXIijfMWA9zowYxwi",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Your Blood",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "yourblood|1WgXqy2Dd70QQOU7Ay074N|247493",
} as const satisfies Track
