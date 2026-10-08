import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryTeenageDream = {
  id: "01a0676a-d72c-7008-bacf-547d1bda506c",
  type: "page-type/release",
  slug: "katy-perry-teenage-dream",
  title: "Teenage Dream",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 67.015617,
  ownProgress: 67.015617,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3BoUxfC7YhxNq3TpOfnRif",
      externalLink: "https://open.spotify.com/album/3BoUxfC7YhxNq3TpOfnRif",
    },
  ],
  createdAt: "2026-09-03T13:17:30.284Z",
  updatedAt: "2026-09-15T16:37:27.000Z",
} as const satisfies Release
