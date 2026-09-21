import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsLoveOfMineNightVisionsDemo = {
  id: "01a0676a-d723-7078-94a6-31bd13f051b9",
  type: "page-type/release",
  slug: "imagine-dragons-love-of-mine-night-visions-demo",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2022-09-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3BAUn8SPQORLl49pDhR30l",
      externalLink: "https://open.spotify.com/album/3BAUn8SPQORLl49pDhR30l",
    },
  ],
  title: "Love Of Mine (Night Visions Demo)",
} as const satisfies Release
