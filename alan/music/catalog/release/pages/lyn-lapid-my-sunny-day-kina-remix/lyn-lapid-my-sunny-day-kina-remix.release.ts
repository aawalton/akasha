import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidMySunnyDayKinaRemix = {
  id: "01a0676a-d725-7036-8930-5e2ef460ffac",
  type: "page-type/release",
  slug: "lyn-lapid-my-sunny-day-kina-remix",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2022-03-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4GKIrekHWizVNtsyHFeWgV",
      externalLink: "https://open.spotify.com/album/4GKIrekHWizVNtsyHFeWgV",
    },
  ],
  title: "My Sunny Day (Kina Remix)",
} as const satisfies Release
