import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixHappyBirthdayBeautiful = {
  id: "01a0676a-d71f-704a-a617-24bbd8cf7563",
  type: "release",
  slug: "pentatonix-happy-birthday-beautiful",
  title: "Happy Birthday Beautiful",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 3.309517,
  ownProgress: 3.309517,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-08-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3dQo0HpK7skdcan7h64LWq",
      externalLink: "https://open.spotify.com/album/3dQo0HpK7skdcan7h64LWq",
    },
  ],
} as const satisfies Release
