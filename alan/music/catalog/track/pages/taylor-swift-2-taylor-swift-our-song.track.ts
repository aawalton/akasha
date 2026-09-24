import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TaylorSwiftOurSong = {
  id: "01a0ce86-96c0-7667-96ac-9a49e0fd8653",
  type: "page-type/track",
  slug: "taylor-swift-2-taylor-swift-our-song",
  ownLength: 3.351766666666667,
  ownProgress: 3.351766666666667,
  partOfCollections: ["release/taylor-swift-2-taylor-swift"],
  status: "completed",
  unit: "unit/minutes",
  title: "Our Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "oursong|06HL4z0CvFAxyc27GXpf02|201106",
  song: "song/taylor-swift-our-song",
  carriedBy: [
    {
      release: "release/taylor-swift-2-taylor-swift",
      discNumber: 1,
      position: 11,
      externalId: "15DeqWWQB4dcEWzJg15VrN",
      externalLink: "https://open.spotify.com/track/15DeqWWQB4dcEWzJg15VrN",
    },
  ],
} as const satisfies Track
