import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappBiteMeThatsSoFunny = {
  id: "01a0caa9-000e-7ab1-aabb-748d809057e4",
  type: "page-type/track",
  slug: "renee-rapp-bite-me-thats-so-funny",
  ownLength: 2.83105,
  ownProgress: 0,
  partOfCollections: ["release/renee-rapp-bite-me"],
  status: "not-started",
  unit: "unit/minutes",
  title: "That’s So Funny",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "thatssofunny|2hUYKu1x0UZQXvzCmggvSn|169863",
  song: "song/renee-rapp-thats-so-funny",
  carriedBy: [
    {
      release: "release/renee-rapp-bite-me",
      discNumber: 1,
      position: 11,
      externalId: "58GzB1Ag0nyo2kjuGgmLax",
      externalLink: "https://open.spotify.com/track/58GzB1Ag0nyo2kjuGgmLax",
    },
  ],
} as const satisfies Track
