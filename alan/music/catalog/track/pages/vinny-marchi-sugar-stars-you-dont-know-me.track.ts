import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsYouDontKnowMe = {
  id: "01a0b112-93e5-7287-a19c-1129a286c93d",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-you-dont-know-me",
  ownLength: 3.0833666666666666,
  ownProgress: 3.0833666666666666,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "you don't know me!!",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "youdontknowme|5USAMqcbMAzF3HBmeD5pJF|185002",
  song: "song/vinny-marchi-you-dont-know-me",
  carriedBy: [
    {
      release: "release/vinny-marchi-sugar-stars",
      discNumber: 1,
      position: 9,
      externalId: "687gCgyJRoArwBfmxK7Qcd",
      externalLink: "https://open.spotify.com/track/687gCgyJRoArwBfmxK7Qcd",
    },
  ],
} as const satisfies Track
