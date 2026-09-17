import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTheHighSongTheHighSong = {
  id: "01a0b112-97a8-7425-adce-bf10163c1eea",
  type: "page-type/track",
  slug: "vinny-marchi-the-high-song-the-high-song",
  ownLength: 2.4917666666666665,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-the-high-song"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6iphhfUPPomm0AOepLnqqq",
      externalLink: "https://open.spotify.com/track/6iphhfUPPomm0AOepLnqqq",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The High Song",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "thehighsong|5USAMqcbMAzF3HBmeD5pJF|149506",
} as const satisfies Track
