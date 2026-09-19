import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraSomeTypeOfSkinSomeTypeOfSkinAcoustic = {
  id: "01a0b638-00cd-77fb-ad64-dbe209db973d",
  type: "page-type/track",
  slug: "aurora-some-type-of-skin-some-type-of-skin-acoustic",
  ownLength: 3.3333333333333335,
  ownProgress: 0,
  partOfCollections: ["release/aurora-some-type-of-skin"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3UQg1zvXxdz1BMXC9tlqst",
      externalLink: "https://open.spotify.com/track/3UQg1zvXxdz1BMXC9tlqst",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Some Type Of Skin - Acoustic",
  trackType: "acoustic",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "sometypeofskinacoustic|1WgXqy2Dd70QQOU7Ay074N|200000",
  song: "song/aurora-some-type-of-skin",
} as const satisfies Track
