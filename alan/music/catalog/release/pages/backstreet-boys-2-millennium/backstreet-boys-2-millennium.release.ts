import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const backstreetBoys2Millennium = {
  id: "01a0676a-d724-7068-b905-a6aa153f98b7",
  type: "release",
  slug: "backstreet-boys-2-millennium",
  title: "Millennium",
  partOfCollections: ["artist/backstreet-boys"],
  position: 0,
  ownLength: 46.045483,
  ownProgress: 46.045483,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1999-05-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ySxm9hxBNss01WCL7GLyQ",
      externalLink: "https://open.spotify.com/album/5ySxm9hxBNss01WCL7GLyQ",
    },
  ],
} as const satisfies Release
