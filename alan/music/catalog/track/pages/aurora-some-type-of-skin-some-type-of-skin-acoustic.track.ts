import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraSomeTypeOfSkinSomeTypeOfSkinAcoustic = {
  id: "01a0b638-00cd-77fb-ad64-dbe209db973d",
  type: "page-type/track",
  slug: "aurora-some-type-of-skin-some-type-of-skin-acoustic",
  ownLength: 3.3333333333333335,
  ownProgress: 3.3333333333333335,
  partOfCollections: ["release/aurora-some-type-of-skin"],
  status: "completed",
  unit: "unit/minutes",
  title: "Some Type Of Skin - Acoustic",
  trackType: "acoustic",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "sometypeofskinacoustic|1WgXqy2Dd70QQOU7Ay074N|200000",
  song: "song/aurora-some-type-of-skin",
  carriedBy: [
    {
      release: "release/aurora-some-type-of-skin",
      discNumber: 1,
      position: 2,
      externalId: "3UQg1zvXxdz1BMXC9tlqst",
      externalLink: "https://open.spotify.com/track/3UQg1zvXxdz1BMXC9tlqst",
    },
  ],
} as const satisfies Track
