import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2OverTheRainbow = {
  id: "01a0676a-d726-7054-8958-18173b8d9e96",
  type: "page-type/release",
  slug: "celtic-woman-2-over-the-rainbow",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2019-08-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "19ig22qPGuSgOoLoUwHYuH",
      externalLink: "https://open.spotify.com/album/19ig22qPGuSgOoLoUwHYuH",
    },
  ],
  title: "Over The Rainbow",
} as const satisfies Release
