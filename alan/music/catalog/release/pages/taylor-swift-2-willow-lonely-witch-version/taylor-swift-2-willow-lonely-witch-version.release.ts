import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2WillowLonelyWitchVersion = {
  id: "01a0676a-d731-7022-9b68-4bf037818eda",
  type: "page-type/release",
  slug: "taylor-swift-2-willow-lonely-witch-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-12-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "77wvNMSdOowJgpJx1kcKqc",
      externalLink: "https://open.spotify.com/album/77wvNMSdOowJgpJx1kcKqc",
    },
  ],
  title: "willow (lonely witch version)",
} as const satisfies Release
