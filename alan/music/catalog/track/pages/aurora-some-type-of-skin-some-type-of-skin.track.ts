import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraSomeTypeOfSkinSomeTypeOfSkin = {
  id: "01a0b638-00a6-7a5c-80fc-acdc674ec210",
  type: "page-type/track",
  slug: "aurora-some-type-of-skin-some-type-of-skin",
  ownLength: 3.20955,
  ownProgress: 3.20955,
  partOfCollections: ["release/aurora-some-type-of-skin"],
  status: "completed",
  unit: "unit/minutes",
  title: "Some Type Of Skin",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "sometypeofskin|1WgXqy2Dd70QQOU7Ay074N|192573",
  song: "song/aurora-some-type-of-skin",
  carriedBy: [
    {
      release: "release/aurora-some-type-of-skin",
      discNumber: 1,
      position: 1,
      externalId: "4dOsAea74AXaO3cOMhJ41f",
      externalLink: "https://open.spotify.com/track/4dOsAea74AXaO3cOMhJ41f",
    },
  ],
} as const satisfies Track
