import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS10e04 = {
  id: "01a18885-00ff-797c-af3d-0312bce92f1e",
  type: "page-type/episode",
  slug: "studio-c-s10e04",
  description:
    "An internet rabbit hole distracts a lawyer from his murder case. A couple swaps out their ordinary home for a glorified porta-potty. And a musical virtuosos perform Beethoven's “Moonlight Sonata” on piano and melodica.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-10"],
  position: 4,
  publishedAt: "2019-10-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1939299",
      externalLink: "https://www.themoviedb.org/tv/68207/season/10/episode/4",
    },
  ],
  title: "Season 10 Episode 4",
  episodeType: "standard",
  stillPath: "/4vr2iXSdQEW6tfDiruJg3vwng5D.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
