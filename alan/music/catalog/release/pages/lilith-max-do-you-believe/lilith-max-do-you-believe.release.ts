import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxDoYouBelieve = {
  id: "01a0676a-d71c-701a-a8f0-85ff29e4a0ae",
  type: "page-type/release",
  slug: "lilith-max-do-you-believe",
  grade: "C",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2023-07-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "48djOOURVciSJQNwG2WJkN",
      externalLink: "https://open.spotify.com/album/48djOOURVciSJQNwG2WJkN",
    },
  ],
  title: "Do You Believe",
} as const satisfies Release
