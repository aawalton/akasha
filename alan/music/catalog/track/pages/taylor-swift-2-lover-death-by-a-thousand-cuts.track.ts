import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverDeathByAThousandCuts = {
  id: "01a0ce86-6f47-786f-9919-13b38764cc09",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-death-by-a-thousand-cuts",
  ownLength: 3.308883333333333,
  ownProgress: 3.308883333333333,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "completed",
  unit: "unit/minutes",
  title: "Death By A Thousand Cuts",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "deathbyathousandcuts|06HL4z0CvFAxyc27GXpf02|198533",
  song: "song/taylor-swift-death-by-a-thousand-cuts",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 10,
      externalId: "2dgFqt3w9xIQRjhPtwNk3D",
      externalLink: "https://open.spotify.com/track/2dgFqt3w9xIQRjhPtwNk3D",
    },
  ],
} as const satisfies Track
