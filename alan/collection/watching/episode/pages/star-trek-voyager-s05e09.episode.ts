import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e09 = {
  id: "01a18853-ac8f-773f-aacf-55bdaeee0948",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e09",
  description:
    "Stardate: Unknown. Tom Paris is demoted to ensign and is sentenced to thirty days in the brig for disobeying orders. While serving his sentence, Tom writes a letter to his father about the events that led to his demotion.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 9,
  publishedAt: "1998-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113212",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/9",
    },
  ],
  title: "Thirty Days",
  episodeType: "standard",
  stillPath: "/fDO2yozP9NQsCzc1TuHoFryUWdU.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
