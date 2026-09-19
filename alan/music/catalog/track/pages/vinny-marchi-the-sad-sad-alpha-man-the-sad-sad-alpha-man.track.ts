import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTheSadSadAlphaManTheSadSadAlphaMan = {
  id: "01a0b112-9677-717f-befd-f3c2404ede70",
  type: "page-type/track",
  slug: "vinny-marchi-the-sad-sad-alpha-man-the-sad-sad-alpha-man",
  ownLength: 2.2146166666666667,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-the-sad-sad-alpha-man"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0SW7UyvrGTN2neA8F8ZzeW",
      externalLink: "https://open.spotify.com/track/0SW7UyvrGTN2neA8F8ZzeW",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Sad Sad Alpha Man",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "thesadsadalphaman|5USAMqcbMAzF3HBmeD5pJF|132877",
  song: "song/vinny-marchi-the-sad-sad-alpha-man",
} as const satisfies Track
