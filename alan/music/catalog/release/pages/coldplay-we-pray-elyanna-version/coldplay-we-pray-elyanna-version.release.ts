import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayWePrayElyannaVersion = {
  id: "01a0676a-d730-7036-b179-bd518bbdc133",
  type: "page-type/release",
  slug: "coldplay-we-pray-elyanna-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2024-09-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7EAQXnF7TwFUHYC2UtIQq6",
      externalLink: "https://open.spotify.com/album/7EAQXnF7TwFUHYC2UtIQq6",
    },
  ],
  title: "WE PRAY (Elyanna Version)",
} as const satisfies Release
