import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2LoverFirstDanceRemix = {
  id: "01a0676a-d724-700a-96ff-313a2b774cbd",
  type: "page-type/release",
  slug: "taylor-swift-2-lover-first-dance-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2019-11-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Ou4LWiU2Vu2V7KdHzw9At",
      externalLink: "https://open.spotify.com/album/6Ou4LWiU2Vu2V7KdHzw9At",
    },
  ],
  title: "Lover (First Dance Remix)",
} as const satisfies Release
