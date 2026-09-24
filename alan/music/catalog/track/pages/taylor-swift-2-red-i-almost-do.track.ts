import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedIAlmostDo = {
  id: "01a0ce86-84c1-7b2d-990f-4750a50099f7",
  type: "page-type/track",
  slug: "taylor-swift-2-red-i-almost-do",
  ownLength: 4.042883333333333,
  ownProgress: 4.042883333333333,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Almost Do",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "ialmostdo|06HL4z0CvFAxyc27GXpf02|242573",
  song: "song/taylor-swift-i-almost-do",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 7,
      externalId: "5VwFkx7JOimOGTYfha5rs1",
      externalLink: "https://open.spotify.com/track/5VwFkx7JOimOGTYfha5rs1",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 7,
      externalId: "31pEV5lPJi7btskZoUr2yu",
      externalLink: "https://open.spotify.com/track/31pEV5lPJi7btskZoUr2yu",
    },
  ],
} as const satisfies Track
