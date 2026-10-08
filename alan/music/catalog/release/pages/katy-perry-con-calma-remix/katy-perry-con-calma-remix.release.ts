import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryConCalmaRemix = {
  id: "01a0676a-d71b-7020-873d-78c68f5cfb1d",
  type: "page-type/release",
  slug: "katy-perry-con-calma-remix",
  title: "Con Calma (Remix)",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 3.021333,
  ownProgress: 3.021333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-04-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5lJogLNbwElUSdBmmf8VQB",
      externalLink: "https://open.spotify.com/album/5lJogLNbwElUSdBmmf8VQB",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
