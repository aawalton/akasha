import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2LavenderHazeFelixJaehnRemix = {
  id: "01a0676a-d722-7063-909e-6a3bdaf22549",
  type: "page-type/release",
  slug: "taylor-swift-2-lavender-haze-felix-jaehn-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2023-02-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5h060Rb0cfAGuny0L51zqV",
      externalLink: "https://open.spotify.com/album/5h060Rb0cfAGuny0L51zqV",
    },
  ],
  title: "Lavender Haze (Felix Jaehn Remix)",
} as const satisfies Release
