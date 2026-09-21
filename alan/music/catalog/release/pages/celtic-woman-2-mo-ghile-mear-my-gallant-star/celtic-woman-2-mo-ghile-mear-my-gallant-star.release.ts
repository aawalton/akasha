import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2MoGhileMearMyGallantStar = {
  id: "01a0676a-d724-707d-a0ba-6b26dc48eb66",
  type: "page-type/release",
  slug: "celtic-woman-2-mo-ghile-mear-my-gallant-star",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2016-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1g4lovWgZv3y1FPjzDKPLp",
      externalLink: "https://open.spotify.com/album/1g4lovWgZv3y1FPjzDKPLp",
    },
  ],
  title: "Mo Ghile Mear (My Gallant Star)",
} as const satisfies Release
