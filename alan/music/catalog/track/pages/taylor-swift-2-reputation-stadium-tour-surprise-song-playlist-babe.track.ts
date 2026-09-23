import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationStadiumTourSurpriseSongPlaylistBabe = {
  id: "01a0ce86-7804-7caf-8107-a6d912457cb5",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-stadium-tour-surprise-song-playlist-babe",
  ownLength: 3.5851,
  ownProgress: 3.5851,
  partOfCollections: ["release/taylor-swift-2-reputation-stadium-tour-surprise-song-playlist"],
  status: "completed",
  unit: "unit/minutes",
  title: "Babe",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "0hYxQe3AK5jBPCr5MumLHD", artistName: "Sugarland" },
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
  ],
  trackKey: "babe|06HL4z0CvFAxyc27GXpf02,0hYxQe3AK5jBPCr5MumLHD|215106",
  song: "song/taylor-swift-babe",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation-stadium-tour-surprise-song-playlist",
      discNumber: 1,
      position: 21,
      externalId: "40PXEOFLJc7UIpLMrhSfW1",
      externalLink: "https://open.spotify.com/track/40PXEOFLJc7UIpLMrhSfW1",
    },
  ],
} as const satisfies Track
