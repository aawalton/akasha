import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const coldplayKaleidoscopeEp = {
  id: "01a0676a-d722-7034-9aa4-ce47c3f214b7",
  type: "release",
  slug: "coldplay-kaleidoscope-ep",
  title: "Kaleidoscope EP",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 24.984617,
  ownProgress: 24.984617,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-07-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0CE9VXSH70pz4BQzMPm9gO",
      externalLink: "https://open.spotify.com/album/0CE9VXSH70pz4BQzMPm9gO",
    },
  ],
} as const satisfies Release
