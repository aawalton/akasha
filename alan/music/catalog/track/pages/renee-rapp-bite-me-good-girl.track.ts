import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappBiteMeGoodGirl = {
  id: "01a0caa8-feba-72a3-bf5d-c0f0c5a99a72",
  type: "page-type/track",
  slug: "renee-rapp-bite-me-good-girl",
  ownLength: 3.2161166666666667,
  ownProgress: 3.2161166666666667,
  partOfCollections: ["release/renee-rapp-bite-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "Good Girl",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "goodgirl|2hUYKu1x0UZQXvzCmggvSn|192967",
  song: "song/renee-rapp-good-girl",
  carriedBy: [
    {
      release: "release/renee-rapp-bite-me",
      discNumber: 1,
      position: 6,
      externalId: "2lVgHyQt2Jp5GbcNzjqls4",
      externalLink: "https://open.spotify.com/track/2lVgHyQt2Jp5GbcNzjqls4",
    },
  ],
} as const satisfies Track
