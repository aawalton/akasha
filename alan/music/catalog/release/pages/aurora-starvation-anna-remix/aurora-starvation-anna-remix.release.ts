import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraStarvationAnnaRemix = {
  id: "01a0676a-d72a-7019-97a4-40f02c144442",
  type: "page-type/release",
  slug: "aurora-starvation-anna-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2024-10-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "651nEjooRVw6JJ78RAeoyK",
      externalLink: "https://open.spotify.com/album/651nEjooRVw6JJ78RAeoyK",
    },
  ],
  title: "Starvation (ANNA Remix)",
} as const satisfies Release
