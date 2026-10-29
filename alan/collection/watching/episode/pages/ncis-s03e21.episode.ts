import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e21 = {
  id: "01a1884b-ef66-76cd-bb87-feea6ff0ddc7",
  type: "page-type/episode",
  slug: "ncis-s03e21",
  description:
    "While working on a regular murder case with the rest of the NCIS team, Abby is almost killed by evidence from the case. Soon it becomes clear that the murder was staged, and that someone wants Abby dead. The team discover some enemies from Abby's past, and they must find out who is the person, before they kill Abby.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 21,
  publishedAt: "2006-04-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334537",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/21",
    },
  ],
  title: "Bloodbath",
  episodeType: "standard",
  stillPath: "/i1seDDmIvaeGxg7WUVCv5j4MPtU.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
