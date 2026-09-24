import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTalesOfTheLesbianHunterTakeTheReins = {
  id: "01a0b112-91aa-73c4-ab65-ebc63069394c",
  type: "page-type/track",
  slug: "vinny-marchi-tales-of-the-lesbian-hunter-take-the-reins",
  ownLength: 2.66875,
  ownProgress: 2.66875,
  partOfCollections: ["release/vinny-marchi-tales-of-the-lesbian-hunter"],
  status: "completed",
  unit: "unit/minutes",
  title: "Take The Reins",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "takethereins|5USAMqcbMAzF3HBmeD5pJF|160125",
  song: "song/vinny-marchi-take-the-reins",
  carriedBy: [
    {
      release: "release/vinny-marchi-tales-of-the-lesbian-hunter",
      discNumber: 1,
      position: 6,
      externalId: "1ib3QJM5JM2nMWkQpVEkDZ",
      externalLink: "https://open.spotify.com/track/1ib3QJM5JM2nMWkQpVEkDZ",
    },
  ],
} as const satisfies Track
