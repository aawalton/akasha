import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS02e06 = {
  id: "01a1884b-3016-7d68-b897-5336798da5f9",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s02e06",
  description:
    "The team’s participation in the annual Red Dress Run is cut short when a Petty Officer is found dead in the French Quarter from a drug overdose.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-2"],
  position: 6,
  publishedAt: "2015-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1132710",
      externalLink: "https://www.themoviedb.org/tv/61387/season/2/episode/6",
    },
  ],
  title: "Insane in the Membrane",
  episodeType: "standard",
  stillPath: "/kVwxC6elYJfGZiGuPagbKqlacrP.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
