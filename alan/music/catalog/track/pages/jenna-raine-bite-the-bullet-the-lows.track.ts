import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineBiteTheBulletTheLows = {
  id: "01a0c621-19fb-7e81-ba85-f62f961f5e11",
  type: "page-type/track",
  slug: "jenna-raine-bite-the-bullet-the-lows",
  ownLength: 3.1670833333333333,
  ownProgress: 0,
  partOfCollections: ["release/jenna-raine-bite-the-bullet"],
  status: "not-started",
  unit: "unit/minutes",
  title: "THE LOWS",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0EiNdCUwM4B5GkTInLAyuj", artistName: "Caleb Hearn" }],
  trackKey: "thelows|0EiNdCUwM4B5GkTInLAyuj|190025",
  song: "song/jenna-raine-the-lows",
  carriedBy: [
    {
      release: "release/jenna-raine-bite-the-bullet",
      discNumber: 1,
      position: 2,
      externalId: "22jbRTgFxtgY1LZlktKPQ6",
      externalLink: "https://open.spotify.com/track/22jbRTgFxtgY1LZlktKPQ6",
    },
  ],
} as const satisfies Track
