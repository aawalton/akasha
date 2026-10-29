import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS03e04 = {
  id: "01a18851-3df5-7789-ba76-197e7d315e4a",
  type: "page-type/episode",
  slug: "person-of-interest-s03e04",
  description:
    "The team must figure out if a prominent lawyer orchestrated the murder of her husband or if she is being framed; Carter is spotted with Reese by her new partner.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-3"],
  position: 4,
  publishedAt: "2013-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64106",
      externalLink: "https://www.themoviedb.org/tv/1411/season/3/episode/4",
    },
  ],
  title: "Reasonable Doubt",
  episodeType: "standard",
  stillPath: "/bh7vBiNiRZBtdSY0biKnnvHX7P7.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
