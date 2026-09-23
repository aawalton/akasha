import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationStadiumTourSurpriseSongPlaylistWonderland = {
  id: "01a0ce86-8031-7cee-b756-94ac2f34ce6c",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-stadium-tour-surprise-song-playlist-wonderland",
  ownLength: 4.092666666666666,
  ownProgress: 4.092666666666666,
  partOfCollections: [
    "release/taylor-swift-2-reputation-stadium-tour-surprise-song-playlist",
    "release/taylor-swift-2-1989-deluxe-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Wonderland",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "wonderland|06HL4z0CvFAxyc27GXpf02|245560",
  song: "song/taylor-swift-wonderland",
  carriedBy: [
    {
      release: "release/taylor-swift-2-1989-deluxe-edition",
      discNumber: 1,
      position: 14,
      externalId: "6iWMI5oOhWrDbLbjmwTWFq",
      externalLink: "https://open.spotify.com/track/6iWMI5oOhWrDbLbjmwTWFq",
    },
    {
      release: "release/taylor-swift-2-reputation-stadium-tour-surprise-song-playlist",
      discNumber: 1,
      position: 42,
      externalId: "0eTCaVOYLpJlSkbEi2jay4",
      externalLink: "https://open.spotify.com/track/0eTCaVOYLpJlSkbEi2jay4",
    },
  ],
} as const satisfies Track
