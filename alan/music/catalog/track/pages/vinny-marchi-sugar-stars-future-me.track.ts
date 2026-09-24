import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsFutureMe = {
  id: "01a0b112-9363-7dda-91b6-eb6dfe192469",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-future-me",
  ownLength: 3.34375,
  ownProgress: 3.34375,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "future me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "futureme|5USAMqcbMAzF3HBmeD5pJF|200625",
  song: "song/vinny-marchi-future-me",
  carriedBy: [
    {
      release: "release/vinny-marchi-sugar-stars",
      discNumber: 1,
      position: 5,
      externalId: "63Q6vuZWEOvu1oIVOB6BJH",
      externalLink: "https://open.spotify.com/track/63Q6vuZWEOvu1oIVOB6BJH",
    },
  ],
} as const satisfies Track
