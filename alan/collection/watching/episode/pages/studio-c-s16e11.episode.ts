import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS16e11 = {
  id: "01a18855-c29f-781d-a2bb-52b2eed72315",
  type: "page-type/episode",
  slug: "studio-c-s16e11",
  description: "Sketch comedy for the whole family. Always a GOOD laugh!",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-16"],
  position: 11,
  publishedAt: "2023-01-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4839044",
      externalLink: "https://www.themoviedb.org/tv/68207/season/16/episode/11",
    },
  ],
  title: "Best of TV Parodies",
  episodeType: "standard",
  stillPath: "/topkFlTyuJhyyjDeHpfeCvgqSvj.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
