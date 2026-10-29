import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e18 = {
  id: "01a1884b-ef6e-7cad-b995-dae9af5fa6ad",
  type: "page-type/episode",
  slug: "ncis-s09e18",
  description:
    "The Secretary of the Navy partners Gibbs with Dr. Samantha Ryan after top secret information is leaked by someone on the inside.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 18,
  publishedAt: "2012-03-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334607",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/18",
    },
  ],
  title: "The Tell",
  episodeType: "standard",
  stillPath: "/giTwxDmGpgMk5WhBA5WyFHxIF8P.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
