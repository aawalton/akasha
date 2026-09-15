import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixNewRulesXAreYouThatSomebody = {
  id: "01a0676a-d725-7055-bb35-efd89f754851",
  type: "page-type/release",
  slug: "pentatonix-new-rules-x-are-you-that-somebody",
  title: "New Rules x Are You That Somebody?",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 2.972667,
  ownProgress: 2.972667,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-03-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "57qvsk9xWdaqC9uEvV0KWT",
      externalLink: "https://open.spotify.com/album/57qvsk9xWdaqC9uEvV0KWT",
    },
  ],
} as const satisfies Release
