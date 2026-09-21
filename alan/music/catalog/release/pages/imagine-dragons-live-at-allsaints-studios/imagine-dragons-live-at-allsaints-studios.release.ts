import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsLiveAtAllsaintsStudios = {
  id: "01a0676a-d723-7041-b41a-8920f79d1a0c",
  type: "page-type/release",
  slug: "imagine-dragons-live-at-allsaints-studios",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2017-08-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "22y98JB7rKhh335uj6nDZ4",
      externalLink: "https://open.spotify.com/album/22y98JB7rKhh335uj6nDZ4",
    },
  ],
  title: "Live At AllSaints Studios",
} as const satisfies Release
