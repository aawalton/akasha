import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const weirdAlYankovic2StraightOuttaLynwood = {
  id: "01a0676a-d72a-7028-920f-24d97e949441",
  type: "release",
  slug: "weird-al-yankovic-2-straight-outta-lynwood",
  title: "Straight Outta Lynwood",
  partOfCollections: ["weird-al-yankovic"],
  position: 0,
  ownLength: 47.8304,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2006-09-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5qNws4KuryY0VNrdtcDwkR",
      externalLink: "https://open.spotify.com/album/5qNws4KuryY0VNrdtcDwkR",
    },
  ],
} as const satisfies Release
