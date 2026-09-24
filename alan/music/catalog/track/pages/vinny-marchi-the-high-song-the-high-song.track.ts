import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTheHighSongTheHighSong = {
  id: "01a0b112-97a8-7425-adce-bf10163c1eea",
  type: "page-type/track",
  slug: "vinny-marchi-the-high-song-the-high-song",
  ownLength: 2.4917666666666665,
  ownProgress: 2.4917666666666665,
  partOfCollections: ["release/vinny-marchi-the-high-song"],
  status: "completed",
  unit: "unit/minutes",
  title: "The High Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "thehighsong|5USAMqcbMAzF3HBmeD5pJF|149506",
  song: "song/vinny-marchi-the-high-song",
  carriedBy: [
    {
      release: "release/vinny-marchi-the-high-song",
      discNumber: 1,
      position: 1,
      externalId: "6iphhfUPPomm0AOepLnqqq",
      externalLink: "https://open.spotify.com/track/6iphhfUPPomm0AOepLnqqq",
    },
  ],
} as const satisfies Track
