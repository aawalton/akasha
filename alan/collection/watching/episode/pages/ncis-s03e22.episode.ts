import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e22 = {
  id: "01a1884b-ef66-7eaa-8428-9d6a37650862",
  type: "page-type/episode",
  slug: "ncis-s03e22",
  description:
    "The NCIS team must protect Ziva when a suspect dies in custody, and her tactic might be the reason why the person died. Things become much more dangerous when the suspect's brother kidnapps Jenny, and demands the release of his brother in exchange for Jenny, but he has no idea that his brother is dead.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 22,
  publishedAt: "2006-05-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334538",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/22",
    },
  ],
  title: "Jeopardy",
  episodeType: "standard",
  stillPath: "/gzttHEfyPHD3TIfMB1vWK9dOPHb.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
