import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e05 = {
  id: "01a1884b-ef6f-7430-9504-0dd47fb786ba",
  type: "page-type/episode",
  slug: "ncis-s10e05",
  description:
    "A Petty Officer is gunned down in a billionaire’s Ferrari and the investigation leads the NCIS team to discover a link to a man Gibbs was named after.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 5,
  publishedAt: "2012-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334674",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/5",
    },
  ],
  title: "The Namesake",
  episodeType: "standard",
  stillPath: "/8KtxXoFfyAlKPIHxnPB0U7306Uf.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
