import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryCampKaty = {
  id: "01a0676a-d719-7056-9037-1b900465d8f7",
  type: "page-type/release",
  slug: "katy-perry-camp-katy",
  title: "Camp Katy",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 21.976517,
  ownProgress: 21.976517,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-10-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ImEgzmMKO9NAnXRTclK6X",
      externalLink: "https://open.spotify.com/album/5ImEgzmMKO9NAnXRTclK6X",
    },
  ],
} as const satisfies Release
