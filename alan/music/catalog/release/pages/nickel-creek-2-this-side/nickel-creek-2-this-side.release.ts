import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const nickelCreek2ThisSide = {
  id: "01a0676a-d72e-7033-8fa0-e0236988243c",
  type: "page-type/release",
  slug: "nickel-creek-2-this-side",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/nickel-creek"],
  position: 0,
  publishedAt: "2002-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "22nQdZSid64plYdy5zRHew",
      externalLink: "https://open.spotify.com/album/22nQdZSid64plYdy5zRHew",
    },
  ],
  title: "This Side",
} as const satisfies Release
