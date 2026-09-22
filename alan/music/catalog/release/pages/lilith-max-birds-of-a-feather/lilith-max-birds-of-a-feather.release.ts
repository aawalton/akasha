import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxBirdsOfAFeather = {
  id: "01a0676a-d719-700b-bc42-b312f47c5073",
  type: "page-type/release",
  slug: "lilith-max-birds-of-a-feather",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2024-05-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "29dIjI91weJ6oK8VTejcpC",
      externalLink: "https://open.spotify.com/album/29dIjI91weJ6oK8VTejcpC",
    },
  ],
  title: "Birds of a Feather",
} as const satisfies Release
