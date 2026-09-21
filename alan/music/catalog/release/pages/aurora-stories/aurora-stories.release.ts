import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraStories = {
  id: "01a0676a-d72a-7022-9275-627868296ae4",
  type: "page-type/release",
  slug: "aurora-stories",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2021-02-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7Dwv4Z7wlHsLNtw6ISi4Q4",
      externalLink: "https://open.spotify.com/album/7Dwv4Z7wlHsLNtw6ISi4Q4",
    },
  ],
  title: "STORIES",
} as const satisfies Release
