import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixHappyBirthdayBeautiful = {
  id: "01a0676a-d71f-704a-a617-24bbd8cf7563",
  type: "page-type/release",
  slug: "pentatonix-happy-birthday-beautiful",
  title: "Happy Birthday Beautiful",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
