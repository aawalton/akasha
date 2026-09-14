import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const paulCardallAnEveningInParis = {
  id: "01a0676a-d717-700f-a4c9-e2d9252f84f7",
  type: "release",
  slug: "paul-cardall-an-evening-in-paris",
  title: "An Evening in Paris",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 5.135633,
  ownProgress: 5.135633,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-05-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0bUCCiuzQAXVURSa8SjKES",
      externalLink: "https://open.spotify.com/album/0bUCCiuzQAXVURSa8SjKES",
    },
  ],
} as const satisfies Release
