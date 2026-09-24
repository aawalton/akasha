import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeLove = {
  id: "01a0c43f-c929-7179-9409-aad8239ba422",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-love",
  ownLength: 2.772666666666667,
  ownProgress: 2.772666666666667,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "love|53XhwfbYqKCa1cC15pYq2q|166360",
  song: "song/imagine-dragons-love",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 12,
      externalId: "5d41vXH0zvpwUrHrmqKqDc",
      externalLink: "https://open.spotify.com/track/5d41vXH0zvpwUrHrmqKqDc",
    },
  ],
} as const satisfies Track
