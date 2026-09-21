import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraMidasTouch = {
  id: "01a0676a-d724-705d-906f-e5ee461cfa45",
  type: "page-type/release",
  slug: "aurora-midas-touch",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2021-11-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WYWxbDRmg5FYVsNp0jhV7",
      externalLink: "https://open.spotify.com/album/6WYWxbDRmg5FYVsNp0jhV7",
    },
  ],
  title: "Midas Touch",
} as const satisfies Release
