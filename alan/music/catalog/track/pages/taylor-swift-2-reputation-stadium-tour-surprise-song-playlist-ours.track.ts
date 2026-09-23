import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationStadiumTourSurpriseSongPlaylistOurs = {
  id: "01a0ce86-78bf-7805-83c6-a225e5e46d5d",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-stadium-tour-surprise-song-playlist-ours",
  ownLength: 3.9891,
  ownProgress: 3.9891,
  partOfCollections: ["release/taylor-swift-2-reputation-stadium-tour-surprise-song-playlist"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ours",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "ours|06HL4z0CvFAxyc27GXpf02|239346",
  song: "song/taylor-swift-ours",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation-stadium-tour-surprise-song-playlist",
      discNumber: 1,
      position: 26,
      externalId: "0V3SNHDka1JSCP71HAzpxw",
      externalLink: "https://open.spotify.com/track/0V3SNHDka1JSCP71HAzpxw",
    },
  ],
} as const satisfies Track
