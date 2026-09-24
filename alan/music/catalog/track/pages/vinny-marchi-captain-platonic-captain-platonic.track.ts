import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiCaptainPlatonicCaptainPlatonic = {
  id: "01a0b112-9654-7ab0-860f-20527017306b",
  type: "page-type/track",
  slug: "vinny-marchi-captain-platonic-captain-platonic",
  ownLength: 2.0246,
  ownProgress: 2.0246,
  partOfCollections: [
    "release/vinny-marchi-captain-platonic",
    "release/vinny-marchi-tales-of-the-lesbian-hunter",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Captain Platonic",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "captainplatonic|5USAMqcbMAzF3HBmeD5pJF|121476",
  song: "song/vinny-marchi-captain-platonic",
  carriedBy: [
    {
      release: "release/vinny-marchi-captain-platonic",
      discNumber: 1,
      position: 1,
      externalId: "0KyvdjIwT3cqIz2VumSp5J",
      externalLink: "https://open.spotify.com/track/0KyvdjIwT3cqIz2VumSp5J",
    },
    {
      release: "release/vinny-marchi-tales-of-the-lesbian-hunter",
      discNumber: 1,
      position: 3,
      externalId: "1dasDI7zosTvvGBibN4itg",
      externalLink: "https://open.spotify.com/track/1dasDI7zosTvvGBibN4itg",
    },
  ],
} as const satisfies Track
