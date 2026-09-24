import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift21989BlankSpace = {
  id: "01a0ce86-7e3c-7286-8fac-06f41243f1dc",
  type: "page-type/track",
  slug: "taylor-swift-2-1989-blank-space",
  ownLength: 3.863766666666667,
  ownProgress: 3.863766666666667,
  partOfCollections: ["release/taylor-swift-2-1989", "release/taylor-swift-2-1989-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Blank Space",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "blankspace|06HL4z0CvFAxyc27GXpf02|231826",
  song: "song/taylor-swift-blank-space",
  carriedBy: [
    {
      release: "release/taylor-swift-2-1989",
      discNumber: 1,
      position: 2,
      externalId: "1p80LdxRV74UKvL8gnD7ky",
      externalLink: "https://open.spotify.com/track/1p80LdxRV74UKvL8gnD7ky",
    },
    {
      release: "release/taylor-swift-2-1989-deluxe-edition",
      discNumber: 1,
      position: 2,
      externalId: "2sC2P3BN0IXujNaaSyDmtP",
      externalLink: "https://open.spotify.com/track/2sC2P3BN0IXujNaaSyDmtP",
    },
  ],
} as const satisfies Track
