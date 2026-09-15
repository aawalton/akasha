import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryTeenageDreamTheCompleteConfection = {
  id: "01a0676a-d72c-700a-9d87-c59e9dc22a8b",
  type: "page-type/release",
  slug: "katy-perry-teenage-dream-the-complete-confection",
  title: "Teenage Dream: The Complete Confection",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 77.007033,
  ownProgress: 77.007033,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-03-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5BvgP623rtvlc0HDcpzquz",
      externalLink: "https://open.spotify.com/album/5BvgP623rtvlc0HDcpzquz",
    },
  ],
} as const satisfies Release
