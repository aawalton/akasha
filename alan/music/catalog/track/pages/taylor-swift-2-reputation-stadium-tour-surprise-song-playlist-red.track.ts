import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationStadiumTourSurpriseSongPlaylistRed = {
  id: "01a0ce86-756c-78d0-ba26-fbf5b5efe4e4",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-stadium-tour-surprise-song-playlist-red",
  ownLength: 3.7182166666666667,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-reputation-stadium-tour-surprise-song-playlist"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Red",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "red|06HL4z0CvFAxyc27GXpf02|223093",
  song: "song/taylor-swift-red",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation-stadium-tour-surprise-song-playlist",
      discNumber: 1,
      position: 4,
      externalId: "4V9NuhKQcUFt4cgbynHV79",
      externalLink: "https://open.spotify.com/track/4V9NuhKQcUFt4cgbynHV79",
    },
  ],
} as const satisfies Track
