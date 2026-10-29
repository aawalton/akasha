import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS04e05 = {
  id: "01a1887e-62aa-7f97-ad3a-8cd2e103dc12",
  type: "page-type/episode",
  slug: "elementary-s04e05",
  description:
    "When an archeologist is murdered, Holmes and Watson believe the man may have been killed for what he discovered during his last excavation in a local landfill. Also, Sherlock’s relationship with Alfredo, his friend and former sobriety sponsor, hits a rough patch.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/elementary-season-4"],
  position: 5,
  publishedAt: "2015-12-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1133995",
      externalLink: "https://www.themoviedb.org/tv/1415/season/4/episode/5",
    },
  ],
  title: "The Games Underfoot",
  episodeType: "standard",
  stillPath: "/2eff2zEf4KbaE97zFektGkiAfhE.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
