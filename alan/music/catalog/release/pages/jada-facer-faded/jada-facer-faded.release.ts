import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerFaded = {
  id: "01a0676a-d71d-705c-8c3d-0fa56da3d47a",
  type: "page-type/release",
  slug: "jada-facer-faded",
  title: "Faded",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.8483,
  ownProgress: 2.8483,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-04-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4kUEq4uEmfNCZBpeywor4i",
      externalLink: "https://open.spotify.com/album/4kUEq4uEmfNCZBpeywor4i",
    },
  ],
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
