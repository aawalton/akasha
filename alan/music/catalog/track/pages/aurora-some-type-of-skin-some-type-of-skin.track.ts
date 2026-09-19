import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraSomeTypeOfSkinSomeTypeOfSkin = {
  id: "01a0b638-00a6-7a5c-80fc-acdc674ec210",
  type: "page-type/track",
  slug: "aurora-some-type-of-skin-some-type-of-skin",
  ownLength: 3.20955,
  ownProgress: 0,
  partOfCollections: ["release/aurora-some-type-of-skin"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4dOsAea74AXaO3cOMhJ41f",
      externalLink: "https://open.spotify.com/track/4dOsAea74AXaO3cOMhJ41f",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Some Type Of Skin",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "sometypeofskin|1WgXqy2Dd70QQOU7Ay074N|192573",
  song: "song/aurora-some-type-of-skin",
} as const satisfies Track
