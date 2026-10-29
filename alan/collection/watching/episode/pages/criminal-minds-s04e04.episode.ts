import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS04e04 = {
  id: "01a18844-d7e9-7913-9316-ec950b7bb3b7",
  type: "page-type/episode",
  slug: "criminal-minds-s04e04",
  description:
    "The BAU joins the manhunt to catch a serial killer who conceals the manner of his crimes by staging car accidents.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-4"],
  position: 4,
  publishedAt: "2008-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282663",
      externalLink: "https://www.themoviedb.org/tv/4057/season/4/episode/4",
    },
  ],
  title: "Paradise",
  episodeType: "standard",
  stillPath: "/mXOaehXKgQiBS6s24ZFVcwFHsJt.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
