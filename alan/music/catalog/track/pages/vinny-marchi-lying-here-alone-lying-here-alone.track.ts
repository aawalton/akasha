import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiLyingHereAloneLyingHereAlone = {
  id: "01a0b112-99e0-77d3-b444-fb2157c283ff",
  type: "page-type/track",
  slug: "vinny-marchi-lying-here-alone-lying-here-alone",
  ownLength: 2.67385,
  ownProgress: 2.67385,
  partOfCollections: ["release/vinny-marchi-lying-here-alone"],
  status: "completed",
  unit: "unit/minutes",
  title: "LYING HERE ALONE",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "lyingherealone|5USAMqcbMAzF3HBmeD5pJF|160431",
  song: "song/vinny-marchi-lying-here-alone",
  carriedBy: [
    {
      release: "release/vinny-marchi-lying-here-alone",
      discNumber: 1,
      position: 1,
      externalId: "3EX5oNwHXuXY3VTJqSbXBs",
      externalLink: "https://open.spotify.com/track/3EX5oNwHXuXY3VTJqSbXBs",
    },
  ],
} as const satisfies Track
