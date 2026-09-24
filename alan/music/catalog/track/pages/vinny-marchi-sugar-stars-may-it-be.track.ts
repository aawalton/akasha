import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsMayItBe = {
  id: "01a0b112-940c-7ceb-9d09-414df93510ce",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-may-it-be",
  ownLength: 3.215133333333333,
  ownProgress: 3.215133333333333,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "May It Be",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "mayitbe|5USAMqcbMAzF3HBmeD5pJF|192908",
  song: "song/vinny-marchi-may-it-be",
  carriedBy: [
    {
      release: "release/vinny-marchi-sugar-stars",
      discNumber: 1,
      position: 10,
      externalId: "5gGvxZp05Lj0aXFVRtin3E",
      externalLink: "https://open.spotify.com/track/5gGvxZp05Lj0aXFVRtin3E",
    },
  ],
} as const satisfies Track
