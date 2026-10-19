import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixAPentatonixChristmasDeluxe = {
  id: "01a0676a-d715-7039-b1b5-ab6475297d3d",
  type: "page-type/release",
  slug: "pentatonix-a-pentatonix-christmas-deluxe",
  title: "A Pentatonix Christmas Deluxe",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-12-06",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3sId8sOH47yqOWopzbEtJn",
      externalLink: "https://open.spotify.com/album/3sId8sOH47yqOWopzbEtJn",
    },
  ],
  createdAt: "2026-09-03T13:17:30.261Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
