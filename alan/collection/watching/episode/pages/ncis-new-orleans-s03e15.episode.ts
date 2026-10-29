import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS03e15 = {
  id: "01a1884b-3019-79c4-94a2-dd8cb4734a19",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s03e15",
  description:
    "A gruesome copycat murder on a street car reopens a former case for Wade, evoking painful memories from her past.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-3"],
  position: 15,
  publishedAt: "2017-02-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1265154",
      externalLink: "https://www.themoviedb.org/tv/61387/season/3/episode/15",
    },
  ],
  title: "End of the Line",
  episodeType: "standard",
  stillPath: "/7aDWLM965gmkTwGCyl1JKKU1vLS.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
