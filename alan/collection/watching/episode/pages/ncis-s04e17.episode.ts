import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e17 = {
  id: "01a1884b-ef67-707f-9af3-5b8046459c6f",
  type: "page-type/episode",
  slug: "ncis-s04e17",
  description:
    "When an explosion at a military cemetery mausoleum reveals a crypt full of a mixture of body parts, the NCIS team must inform the families of the victims, hoping to find a connection and narrow down the suspects to find out who is behind the hideous crime.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 17,
  publishedAt: "2007-02-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334487",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/17",
    },
  ],
  title: "Skeletons",
  episodeType: "standard",
  stillPath: "/eepjziGy2Wws4GETPg19bepukuY.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
