import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS11e12 = {
  id: "01a1884a-e0f4-7db5-a38b-c1b27a860d95",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s11e12",
  description:
    "CIA Officer Veronica Stephens asks the team for help when an agricultural engineer Hetty asked her to bring to the United States disappears",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-11"],
  position: 12,
  publishedAt: "2020-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1997206",
      externalLink: "https://www.themoviedb.org/tv/17610/season/11/episode/12",
    },
  ],
  title: "Groundwork",
  episodeType: "standard",
  stillPath: "/68cBcDBvWEUIY4cOWIP30Kel6jV.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
