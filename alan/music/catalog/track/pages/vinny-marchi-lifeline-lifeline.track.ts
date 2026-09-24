import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiLifelineLifeline = {
  id: "01a0b112-9b63-7a55-823c-146c1a414f37",
  type: "page-type/track",
  slug: "vinny-marchi-lifeline-lifeline",
  ownLength: 3.4047666666666667,
  ownProgress: 3.4047666666666667,
  partOfCollections: ["release/vinny-marchi-lifeline"],
  status: "completed",
  unit: "unit/minutes",
  title: "LIFELINE",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "lifeline|5USAMqcbMAzF3HBmeD5pJF|204286",
  song: "song/vinny-marchi-lifeline",
  carriedBy: [
    {
      release: "release/vinny-marchi-lifeline",
      discNumber: 1,
      position: 1,
      externalId: "5fXqQoYXs7VDmJCywveVet",
      externalLink: "https://open.spotify.com/track/5fXqQoYXs7VDmJCywveVet",
    },
  ],
} as const satisfies Track
