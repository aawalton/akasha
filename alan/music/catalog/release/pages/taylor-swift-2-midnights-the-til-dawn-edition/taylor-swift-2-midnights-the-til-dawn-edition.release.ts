import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEdition = {
  id: "01a0676a-d724-7067-a84b-9876c6c50e05",
  type: "page-type/release",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2023-05-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1fnJ7k0bllNfL1kVdNVW1A",
      externalLink: "https://open.spotify.com/album/1fnJ7k0bllNfL1kVdNVW1A",
    },
  ],
  title: "Midnights (The Til Dawn Edition)",
} as const satisfies Release
