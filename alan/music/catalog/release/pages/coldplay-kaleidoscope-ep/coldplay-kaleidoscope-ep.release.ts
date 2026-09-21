import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayKaleidoscopeEp = {
  id: "01a0676a-d722-7034-9aa4-ce47c3f214b7",
  type: "page-type/release",
  slug: "coldplay-kaleidoscope-ep",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2017-07-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0CE9VXSH70pz4BQzMPm9gO",
      externalLink: "https://open.spotify.com/album/0CE9VXSH70pz4BQzMPm9gO",
    },
  ],
  title: "Kaleidoscope EP",
} as const satisfies Release
