import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaPerfectPerfect = {
  id: "01a15994-8c66-7601-968c-1b71c4171ce9",
  type: "page-type/track",
  slug: "sia-perfect-perfect",
  ownLength: 3.45675,
  ownProgress: 3.45675,
  partOfCollections: ["release/sia-perfect"],
  status: "completed",
  unit: "unit/minutes",
  title: "Perfect",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Sam i" },
    { artistName: "Tropkillaz" },
    { artistName: "BIA" },
    { artistName: "Mc Pikachu" },
  ],
  trackKey:
    "perfect|5AUTN6tMncnOnYgJK1VM6K,5bzWtCkjIAMgN93gLt56SO,6qFbBE8ubS4NxtxVPytxG5,6veh5zbFpm31XsPdjBgPER|207405",
  song: "song/sia-perfect",
  carriedBy: [
    {
      release: "release/sia-perfect",
      discNumber: 1,
      position: 3,
      externalId: "1HxewH6lfEMDgxRvOn9sFD",
      externalLink: "https://open.spotify.com/track/1HxewH6lfEMDgxRvOn9sFD",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T14:01:17.710Z",
  progressedAt: "2026-10-20T14:01:17.710Z",
} as const satisfies Track
