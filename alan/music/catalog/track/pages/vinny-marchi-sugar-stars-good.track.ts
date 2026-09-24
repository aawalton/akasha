import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsGood = {
  id: "01a0b112-9321-77ab-b8b8-2a4f979b71ab",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-good",
  ownLength: 2.4893,
  ownProgress: 2.4893,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "good",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "good|5USAMqcbMAzF3HBmeD5pJF|149358",
  song: "song/vinny-marchi-good",
  carriedBy: [
    {
      release: "release/vinny-marchi-sugar-stars",
      discNumber: 1,
      position: 3,
      externalId: "12XwertpK0Q36AyuHgDA3P",
      externalLink: "https://open.spotify.com/track/12XwertpK0Q36AyuHgDA3P",
    },
  ],
} as const satisfies Track
