import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverSoonYoullGetBetterFeatTheChicks = {
  id: "01a0ce86-6f9a-7ba0-9dc9-130cb2f87e11",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-soon-youll-get-better-feat-the-chicks",
  ownLength: 3.359766666666667,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Soon You’ll Get Better (feat. The Chicks)",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "25IG9fa7cbdmCIy3OnuH57", artistName: "The Chicks" },
  ],
  trackKey: "soonyoullgetbetterfeatthechicks|06HL4z0CvFAxyc27GXpf02,25IG9fa7cbdmCIy3OnuH57|201586",
  song: "song/taylor-swift-soon-you-ll-get-better",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 12,
      externalId: "4AYtqFyFbX0Xkc2wtcygTr",
      externalLink: "https://open.spotify.com/track/4AYtqFyFbX0Xkc2wtcygTr",
    },
  ],
} as const satisfies Track
