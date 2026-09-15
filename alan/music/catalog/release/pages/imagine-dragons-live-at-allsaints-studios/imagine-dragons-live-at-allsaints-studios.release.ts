import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsLiveAtAllsaintsStudios = {
  id: "01a0676a-d723-7041-b41a-8920f79d1a0c",
  type: "page-type/release",
  slug: "imagine-dragons-live-at-allsaints-studios",
  title: "Live At AllSaints Studios",
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  ownLength: 14.308333,
  ownProgress: 14.308333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-08-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "22y98JB7rKhh335uj6nDZ4",
      externalLink: "https://open.spotify.com/album/22y98JB7rKhh335uj6nDZ4",
    },
  ],
} as const satisfies Release
