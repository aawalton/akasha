import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2HomecomingLiveFromIreland = {
  id: "01a0676a-d720-7055-939e-fbcbcea603a5",
  type: "page-type/release",
  slug: "celtic-woman-2-homecoming-live-from-ireland",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2018-01-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6knvXgcRqvxV5M46T05Rjv",
      externalLink: "https://open.spotify.com/album/6knvXgcRqvxV5M46T05Rjv",
    },
  ],
  title: "Homecoming – Live From Ireland",
} as const satisfies Release
