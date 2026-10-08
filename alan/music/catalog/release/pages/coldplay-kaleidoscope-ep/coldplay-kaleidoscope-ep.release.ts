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
  createdAt: "2026-09-03T13:17:30.274Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
