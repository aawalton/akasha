import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineBeLikeYou2BeautifulYou = {
  id: "01a0c621-268b-7fac-a2a7-8fd7350348bd",
  type: "page-type/track",
  slug: "jenna-raine-be-like-you-2-beautiful-you",
  ownLength: 3.7604166666666665,
  ownProgress: 3.7604166666666665,
  partOfCollections: ["release/jenna-raine-be-like-you-2", "release/jenna-raine-be-like-you"],
  status: "completed",
  unit: "unit/minutes",
  title: "Beautiful You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "beautifulyou|3aHe9rMa5HFTjXHw8tEz0A|225625",
  song: "song/jenna-raine-beautiful-you",
  carriedBy: [
    {
      release: "release/jenna-raine-be-like-you",
      discNumber: 1,
      position: 3,
      externalId: "2KHgEl3ihfAALw3xKdDTNu",
      externalLink: "https://open.spotify.com/track/2KHgEl3ihfAALw3xKdDTNu",
    },
    {
      release: "release/jenna-raine-be-like-you-2",
      discNumber: 1,
      position: 3,
      externalId: "0t1V9dSq4wmCubrbGGECwQ",
      externalLink: "https://open.spotify.com/track/0t1V9dSq4wmCubrbGGECwQ",
    },
  ],
} as const satisfies Track
