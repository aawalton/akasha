import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS12e02 = {
  id: "01a1884a-e0f5-7770-af07-52ceabb9678e",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s12e02",
  description:
    "As the trial begins of a Chief Petty Officer who Callen and Sam arrested for war crimes last year, the NCIS team is called to help find the missing star witness.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-12"],
  position: 2,
  publishedAt: "2020-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2510041",
      externalLink: "https://www.themoviedb.org/tv/17610/season/12/episode/2",
    },
  ],
  title: "War Crimes",
  episodeType: "standard",
  stillPath: "/xCuyeOF0dnb6VQpYMek3T5bF5eM.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
