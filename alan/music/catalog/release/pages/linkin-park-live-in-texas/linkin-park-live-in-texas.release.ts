import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkLiveInTexas = {
  id: "01a0676a-d723-7052-9cc3-5df42dbc22a3",
  type: "release",
  slug: "linkin-park-live-in-texas",
  title: "Live in Texas",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 41.8515,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-12-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ZBE7rVC0zKFVt5osvXlnz",
      externalLink: "https://open.spotify.com/album/0ZBE7rVC0zKFVt5osvXlnz",
    },
  ],
} as const satisfies Release
