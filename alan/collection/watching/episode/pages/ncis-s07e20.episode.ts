import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e20 = {
  id: "01a1884b-ef6b-730e-a033-55781b083e19",
  type: "page-type/episode",
  slug: "ncis-s07e20",
  description:
    "When an NCIS polygraph specialist's night job takes a dangerous turn, Gibbs, Fornell, and the team have to uncover the truth.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 20,
  publishedAt: "2010-04-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334558",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/20",
    },
  ],
  title: "Moonlighting",
  episodeType: "standard",
  stillPath: "/nEiBwYQ6HQ6PBsNzuJLyzoRC2a4.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
