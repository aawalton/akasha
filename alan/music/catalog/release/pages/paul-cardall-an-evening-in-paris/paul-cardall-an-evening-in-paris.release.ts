import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallAnEveningInParis = {
  id: "01a0676a-d717-700f-a4c9-e2d9252f84f7",
  type: "page-type/release",
  slug: "paul-cardall-an-evening-in-paris",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2023-05-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0bUCCiuzQAXVURSa8SjKES",
      externalLink: "https://open.spotify.com/album/0bUCCiuzQAXVURSa8SjKES",
    },
  ],
  title: "An Evening in Paris",
} as const satisfies Release
