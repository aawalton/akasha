import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const nickelCreek2DestinationLive = {
  id: "01a0676a-d71c-700c-ace0-858b850e1401",
  type: "page-type/release",
  slug: "nickel-creek-2-destination-live",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/nickel-creek"],
  position: 0,
  publishedAt: "2022-11-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6o8N3qkZhqEyivI7dJXCX5",
      externalLink: "https://open.spotify.com/album/6o8N3qkZhqEyivI7dJXCX5",
    },
  ],
  title: "Destination (Live)",
} as const satisfies Release
