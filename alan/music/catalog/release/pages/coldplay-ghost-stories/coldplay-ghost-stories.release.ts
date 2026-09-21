import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayGhostStories = {
  id: "01a0676a-d71e-705a-a817-a5eae62043d3",
  type: "page-type/release",
  slug: "coldplay-ghost-stories",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2014-05-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2G4AUqfwxcV1UdQjm2ouYr",
      externalLink: "https://open.spotify.com/album/2G4AUqfwxcV1UdQjm2ouYr",
    },
  ],
  title: "Ghost Stories",
} as const satisfies Release
