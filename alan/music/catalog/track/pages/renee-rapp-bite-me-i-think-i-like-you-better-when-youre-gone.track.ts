import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappBiteMeIThinkILikeYouBetterWhenYoureGone = {
  id: "01a0caa9-0d82-7970-9484-d3fcd60a4c00",
  type: "page-type/track",
  slug: "renee-rapp-bite-me-i-think-i-like-you-better-when-youre-gone",
  ownLength: 2.3883,
  ownProgress: 0,
  partOfCollections: [
    "release/renee-rapp-bite-me",
    "release/renee-rapp-i-think-i-like-you-better-when-you-re-gone",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "I Think I Like You Better When You’re Gone",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "ithinkilikeyoubetterwhenyouregone|2hUYKu1x0UZQXvzCmggvSn|143298",
  song: "song/renee-rapp-i-think-i-like-you-better-when-youre-gone",
  carriedBy: [
    {
      release: "release/renee-rapp-bite-me",
      discNumber: 1,
      position: 10,
      externalId: "3hBzKgqQKkChH9hyb3MhmT",
      externalLink: "https://open.spotify.com/track/3hBzKgqQKkChH9hyb3MhmT",
    },
    {
      release: "release/renee-rapp-i-think-i-like-you-better-when-you-re-gone",
      discNumber: 1,
      position: 1,
      externalId: "26gqJsAZ8xnvqENUmmyrVH",
      externalLink: "https://open.spotify.com/track/26gqJsAZ8xnvqENUmmyrVH",
    },
  ],
} as const satisfies Track
