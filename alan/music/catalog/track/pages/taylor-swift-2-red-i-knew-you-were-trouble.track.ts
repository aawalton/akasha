import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedIKnewYouWereTrouble = {
  id: "01a0ce86-8446-721f-8455-ca9c3f71ac34",
  type: "page-type/track",
  slug: "taylor-swift-2-red-i-knew-you-were-trouble",
  ownLength: 3.6328833333333335,
  ownProgress: 3.6328833333333335,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Knew You Were Trouble.",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "iknewyouweretrouble|06HL4z0CvFAxyc27GXpf02|217973",
  song: "song/taylor-swift-i-knew-you-were-trouble",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 4,
      externalId: "72jCZdH0Lhg93z6Z4hBjgj",
      externalLink: "https://open.spotify.com/track/72jCZdH0Lhg93z6Z4hBjgj",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 4,
      externalId: "0ciHz919LVKoH4zgxyMPZ9",
      externalLink: "https://open.spotify.com/track/0ciHz919LVKoH4zgxyMPZ9",
    },
  ],
} as const satisfies Track
