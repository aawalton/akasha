import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationStadiumTourSurpriseSongPlaylistAllTooWell = {
  id: "01a0ce86-74fc-7e9c-b1ab-2aae31d8e766",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-stadium-tour-surprise-song-playlist-all-too-well",
  ownLength: 5.486,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-reputation-stadium-tour-surprise-song-playlist"],
  status: "not-started",
  unit: "unit/minutes",
  title: "All Too Well",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "alltoowell|06HL4z0CvFAxyc27GXpf02|329160",
  song: "song/taylor-swift-all-too-well",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation-stadium-tour-surprise-song-playlist",
      discNumber: 1,
      position: 1,
      externalId: "00vJzaoxM3Eja1doBUhX0P",
      externalLink: "https://open.spotify.com/track/00vJzaoxM3Eja1doBUhX0P",
    },
  ],
} as const satisfies Track
