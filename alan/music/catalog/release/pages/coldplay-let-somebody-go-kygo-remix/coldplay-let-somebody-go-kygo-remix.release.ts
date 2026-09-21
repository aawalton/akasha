import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayLetSomebodyGoKygoRemix = {
  id: "01a0676a-d723-7022-a227-ee6fb67ccaa6",
  type: "page-type/release",
  slug: "coldplay-let-somebody-go-kygo-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2022-03-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7EZAIhKzfjXbAsL0hrQjGF",
      externalLink: "https://open.spotify.com/album/7EZAIhKzfjXbAsL0hrQjGF",
    },
  ],
  title: "Let Somebody Go (Kygo Remix)",
} as const satisfies Release
