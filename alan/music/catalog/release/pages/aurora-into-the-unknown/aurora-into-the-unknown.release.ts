import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraIntoTheUnknown = {
  id: "01a0676a-d721-707a-b90c-657f37b26c65",
  type: "page-type/release",
  slug: "aurora-into-the-unknown",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2020-03-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4iSXUMDfkZMFLIEnkAWWDL",
      externalLink: "https://open.spotify.com/album/4iSXUMDfkZMFLIEnkAWWDL",
    },
  ],
  title: "Into the Unknown",
} as const satisfies Release
