import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e05 = {
  id: "01a1884b-ef6a-7782-9f32-934f6694331f",
  type: "page-type/episode",
  slug: "ncis-s07e05",
  description:
    'When a Marine known for his practical jokes is found dead on Halloween Eve, the NCIS team discovers that the victim\'s "good-natured" pranks may have inspired ghoulish retribution.',
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 5,
  publishedAt: "2009-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334547",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/5",
    },
  ],
  title: "Code of Conduct",
  episodeType: "standard",
  stillPath: "/c9r88mESch8ibUWyaicZRI8foHM.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
