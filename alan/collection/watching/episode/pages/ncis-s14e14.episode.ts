import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e14 = {
  id: "01a1884b-ef75-713e-918b-14eabb89d093",
  type: "page-type/episode",
  slug: "ncis-s14e14",
  description:
    'The murder of a Petty Officer in a small town outside D.C. prompts NCIS to once again work with "The Sherlocks," a privately funded investigative team that includes their newest member, Anthony DiNozzo, Sr.',
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 14,
  publishedAt: "2017-02-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1257634",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/14",
    },
  ],
  title: "Nonstop",
  episodeType: "standard",
  stillPath: "/qQ9O7OGFKv1cgdT1o1sf3ygTlEB.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
