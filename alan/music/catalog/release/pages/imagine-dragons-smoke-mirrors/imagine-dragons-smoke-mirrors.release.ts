import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsSmokeMirrors = {
  id: "01a0676a-d729-7034-af15-99c3dbcd8899",
  type: "page-type/release",
  slug: "imagine-dragons-smoke-mirrors",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2014-09-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0gmsXcmrcnxdZBrD5EyJEL",
      externalLink: "https://open.spotify.com/album/0gmsXcmrcnxdZBrD5EyJEL",
    },
  ],
  title: "Smoke + Mirrors",
} as const satisfies Release
