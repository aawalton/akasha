import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TaylorSwiftMarysSongOhMyMyMy = {
  id: "01a0ce86-9698-73a9-889b-2bc9ae1b1243",
  type: "page-type/track",
  slug: "taylor-swift-2-taylor-swift-marys-song-oh-my-my-my",
  ownLength: 3.5513333333333335,
  ownProgress: 3.5513333333333335,
  partOfCollections: ["release/taylor-swift-2-taylor-swift"],
  status: "completed",
  unit: "unit/minutes",
  title: "Mary's Song (Oh My My My)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "maryssongohmymymy|06HL4z0CvFAxyc27GXpf02|213080",
  song: "song/taylor-swift-mary-s-song-oh-my-my-my",
  carriedBy: [
    {
      release: "release/taylor-swift-2-taylor-swift",
      discNumber: 1,
      position: 10,
      externalId: "2QrQCMel6v2JiLxqrg4p2O",
      externalLink: "https://open.spotify.com/track/2QrQCMel6v2JiLxqrg4p2O",
    },
  ],
} as const satisfies Track
