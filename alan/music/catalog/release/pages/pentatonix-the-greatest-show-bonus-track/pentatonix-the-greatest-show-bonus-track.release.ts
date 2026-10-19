import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixTheGreatestShowBonusTrack = {
  id: "01a0676a-d72d-701b-9bb1-929b2d9350f8",
  type: "page-type/release",
  slug: "pentatonix-the-greatest-show-bonus-track",
  title: "The Greatest Show (Bonus Track)",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-11-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5WjXRSjfEKZ3WCJm68gznR",
      externalLink: "https://open.spotify.com/album/5WjXRSjfEKZ3WCJm68gznR",
    },
  ],
  createdAt: "2026-09-03T13:17:30.285Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
