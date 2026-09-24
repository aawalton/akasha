import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ReasonSWhyTheVeryBestOutOfTheWoods = {
  id: "01a0caa8-b292-7b76-9951-d5cebe526a04",
  type: "page-type/track",
  slug: "nickel-creek-2-reason-s-why-the-very-best-out-of-the-woods",
  ownLength: 5.34,
  ownProgress: 5.34,
  partOfCollections: ["release/nickel-creek-2-reason-s-why-the-very-best"],
  status: "completed",
  unit: "unit/minutes",
  title: "Out Of The Woods",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "outofthewoods|3bcLBxvaI7GsBzGp3WHnwQ|320400",
  song: "song/nickel-creek-out-of-the-woods",
  carriedBy: [
    {
      release: "release/nickel-creek-2-reason-s-why-the-very-best",
      discNumber: 1,
      position: 2,
      externalId: "66yNepcvHMrSOBgl9ARfc4",
      externalLink: "https://open.spotify.com/track/66yNepcvHMrSOBgl9ARfc4",
    },
  ],
} as const satisfies Track
