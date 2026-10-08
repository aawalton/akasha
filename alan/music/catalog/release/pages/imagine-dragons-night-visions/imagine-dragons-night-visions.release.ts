import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsNightVisions = {
  id: "01a0676a-d725-705b-8b5a-ef1b0c98b506",
  type: "page-type/release",
  slug: "imagine-dragons-night-visions",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2012-09-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6htgf3qv7vGcsdxLCDxKp8",
      externalLink: "https://open.spotify.com/album/6htgf3qv7vGcsdxLCDxKp8",
    },
  ],
  title: "Night Visions",
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
