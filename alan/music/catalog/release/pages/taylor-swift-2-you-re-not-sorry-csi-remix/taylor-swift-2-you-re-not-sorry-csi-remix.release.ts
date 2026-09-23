import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2YouReNotSorryCsiRemix = {
  id: "01a0676a-d732-7016-a636-b3dd49673635",
  type: "page-type/release",
  slug: "taylor-swift-2-you-re-not-sorry-csi-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-02-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5sZIjREu3s225wwqJkgsYV",
      externalLink: "https://open.spotify.com/album/5sZIjREu3s225wwqJkgsYV",
    },
  ],
  title: "You're Not Sorry (CSI Remix)",
} as const satisfies Release
