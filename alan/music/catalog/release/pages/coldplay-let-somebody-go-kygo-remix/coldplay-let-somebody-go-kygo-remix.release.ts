import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayLetSomebodyGoKygoRemix = {
  id: "01a0676a-d723-7022-a227-ee6fb67ccaa6",
  type: "page-type/release",
  slug: "coldplay-let-somebody-go-kygo-remix",
  title: "Let Somebody Go (Kygo Remix)",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 10.863517,
  ownProgress: 10.863517,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-03-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7EZAIhKzfjXbAsL0hrQjGF",
      externalLink: "https://open.spotify.com/album/7EZAIhKzfjXbAsL0hrQjGF",
    },
  ],
} as const satisfies Release
