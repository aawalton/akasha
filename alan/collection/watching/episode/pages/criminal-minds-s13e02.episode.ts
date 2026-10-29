import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS13e02 = {
  id: "01a18844-d7f6-7c00-94cd-30e938502353",
  type: "page-type/episode",
  slug: "criminal-minds-s13e02",
  description:
    "The BAU investigates three similar crimes in which victims' remains are discovered in old suitcases.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-13"],
  position: 2,
  publishedAt: "2017-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1372151",
      externalLink: "https://www.themoviedb.org/tv/4057/season/13/episode/2",
    },
  ],
  title: "To a Better Place",
  episodeType: "standard",
  stillPath: "/oT1LWF4ShEioX7jG3DgejfxlQUF.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
