import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsCutTheCake = {
  id: "01a0b112-93a4-72a7-9509-5cda53288741",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-cut-the-cake",
  ownLength: 3.6867833333333335,
  ownProgress: 3.6867833333333335,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "cut the cake",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "cutthecake|5USAMqcbMAzF3HBmeD5pJF|221207",
  song: "song/vinny-marchi-cut-the-cake",
  carriedBy: [
    {
      release: "release/vinny-marchi-sugar-stars",
      discNumber: 1,
      position: 7,
      externalId: "3XiV1hZl7W4o510SdSHMAy",
      externalLink: "https://open.spotify.com/track/3XiV1hZl7W4o510SdSHMAy",
    },
  ],
} as const satisfies Track
