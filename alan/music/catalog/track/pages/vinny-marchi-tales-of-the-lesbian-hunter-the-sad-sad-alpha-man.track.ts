import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTalesOfTheLesbianHunterTheSadSadAlphaMan = {
  id: "01a0b112-916c-7871-ada5-8872db0a6974",
  type: "page-type/track",
  slug: "vinny-marchi-tales-of-the-lesbian-hunter-the-sad-sad-alpha-man",
  ownLength: 2.2146166666666667,
  ownProgress: 2.2146166666666667,
  partOfCollections: [
    "release/vinny-marchi-tales-of-the-lesbian-hunter",
    "release/vinny-marchi-the-sad-sad-alpha-man",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Sad Sad Alpha Man",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "thesadsadalphaman|5USAMqcbMAzF3HBmeD5pJF|132877",
  song: "song/vinny-marchi-the-sad-sad-alpha-man",
  carriedBy: [
    {
      release: "release/vinny-marchi-tales-of-the-lesbian-hunter",
      discNumber: 1,
      position: 4,
      externalId: "5RYTElFWkjRgwhJWBWHVXk",
      externalLink: "https://open.spotify.com/track/5RYTElFWkjRgwhJWBWHVXk",
    },
    {
      release: "release/vinny-marchi-the-sad-sad-alpha-man",
      discNumber: 1,
      position: 1,
      externalId: "0SW7UyvrGTN2neA8F8ZzeW",
      externalLink: "https://open.spotify.com/track/0SW7UyvrGTN2neA8F8ZzeW",
    },
  ],
} as const satisfies Track
