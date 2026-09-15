import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraBringBackTheColorFeatAurora = {
  id: "01a0676a-d719-7039-9b80-7448e3fea8c1",
  type: "page-type/release",
  slug: "aurora-bring-back-the-color-feat-aurora",
  title: "BRING BACK THE COLOR (feat. AURORA)",
  partOfCollections: ["artist/aurora"],
  position: 0,
  ownLength: 2.809083,
  ownProgress: 2.809083,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-06-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5F3hrGQ5xXSg7ZxNvvDUxo",
      externalLink: "https://open.spotify.com/album/5F3hrGQ5xXSg7ZxNvvDUxo",
    },
  ],
} as const satisfies Release
