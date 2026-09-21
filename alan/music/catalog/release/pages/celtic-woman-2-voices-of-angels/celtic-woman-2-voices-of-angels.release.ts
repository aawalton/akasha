import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2VoicesOfAngels = {
  id: "01a0676a-d730-700b-afee-9fb598750f76",
  type: "page-type/release",
  slug: "celtic-woman-2-voices-of-angels",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2016-11-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7v803jrnOG2WmjlpUTzvi7",
      externalLink: "https://open.spotify.com/album/7v803jrnOG2WmjlpUTzvi7",
    },
  ],
  title: "Voices Of Angels",
} as const satisfies Release
