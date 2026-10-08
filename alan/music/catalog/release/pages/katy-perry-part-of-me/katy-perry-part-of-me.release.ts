import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryPartOfMe = {
  id: "01a0676a-d726-7060-88f9-9a2707fd9686",
  type: "page-type/release",
  slug: "katy-perry-part-of-me",
  title: "Part Of Me",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 17.00535,
  ownProgress: 17.00535,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5INuonUsIvNm8lrepTm41x",
      externalLink: "https://open.spotify.com/album/5INuonUsIvNm8lrepTm41x",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
