import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e15 = {
  id: "01a1884b-ef64-7674-9995-196a0c43ad09",
  type: "page-type/episode",
  slug: "ncis-s02e15",
  description:
    "The team take on a case of a dead Marine who recorded his death while falling off a cliff. The prime suspects are his wife and his best friend with whom he had a picnic in the camp. Gibbs finds out they had an affair behind the dead man's back.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 15,
  publishedAt: "2005-02-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334510",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/15",
    },
  ],
  title: "Caught on Tape",
  episodeType: "standard",
  stillPath: "/1ZewCCBAfmkT2j5m1LI1VkRUEZK.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
