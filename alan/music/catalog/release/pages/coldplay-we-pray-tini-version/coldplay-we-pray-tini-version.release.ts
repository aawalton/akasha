import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayWePrayTiniVersion = {
  id: "01a0676a-d730-7038-b89c-8f1017c2b61a",
  type: "page-type/release",
  slug: "coldplay-we-pray-tini-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2024-09-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7JTrcbIR88dkMfNvdxcZBO",
      externalLink: "https://open.spotify.com/album/7JTrcbIR88dkMfNvdxcZBO",
    },
  ],
  title: "WE PRAY (TINI Version)",
} as const satisfies Release
