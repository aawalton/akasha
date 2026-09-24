import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiAllIGaveToYouAllIGaveToYou = {
  id: "01a0b112-9bb3-7db9-be22-137796a6c6fc",
  type: "page-type/track",
  slug: "vinny-marchi-all-i-gave-to-you-all-i-gave-to-you",
  ownLength: 3.4268666666666667,
  ownProgress: 3.4268666666666667,
  partOfCollections: ["release/vinny-marchi-all-i-gave-to-you"],
  status: "completed",
  unit: "unit/minutes",
  title: "all i gave to you",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "alligavetoyou|5USAMqcbMAzF3HBmeD5pJF|205612",
  song: "song/vinny-marchi-all-i-gave-to-you",
  carriedBy: [
    {
      release: "release/vinny-marchi-all-i-gave-to-you",
      discNumber: 1,
      position: 1,
      externalId: "3nBq6cQwrsAiSGaR4b5drk",
      externalLink: "https://open.spotify.com/track/3nBq6cQwrsAiSGaR4b5drk",
    },
  ],
} as const satisfies Track
