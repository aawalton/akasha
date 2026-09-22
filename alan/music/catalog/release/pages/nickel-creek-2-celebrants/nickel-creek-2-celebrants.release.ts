import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const nickelCreek2Celebrants = {
  id: "01a0676a-d71a-7007-b908-6089a5d340f6",
  type: "page-type/release",
  slug: "nickel-creek-2-celebrants",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/nickel-creek"],
  position: 0,
  publishedAt: "2023-03-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ruZGj3O7oL91f9re3BXLq",
      externalLink: "https://open.spotify.com/album/2ruZGj3O7oL91f9re3BXLq",
    },
  ],
  title: "Celebrants",
} as const satisfies Release
