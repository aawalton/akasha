import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2RenegadePopVersion = {
  id: "01a0676a-d727-7068-b00a-0a813f0e99b2",
  type: "page-type/release",
  slug: "taylor-swift-2-renegade-pop-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2021-08-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "49yiYOnz2UyaNl72xvDERt",
      externalLink: "https://open.spotify.com/album/49yiYOnz2UyaNl72xvDERt",
    },
  ],
  title: "Renegade (Pop Version)",
} as const satisfies Release
