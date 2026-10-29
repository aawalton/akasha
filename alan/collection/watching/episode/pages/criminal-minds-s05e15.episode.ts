import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS05e15 = {
  id: "01a18844-d7ec-720b-938b-df96ffa833c9",
  type: "page-type/episode",
  slug: "criminal-minds-s05e15",
  description:
    "A serial killer who targets random victims in highly visible places to create a sense of public fear is the subject of a BAU investigation.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-5"],
  position: 15,
  publishedAt: "2010-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283283",
      externalLink: "https://www.themoviedb.org/tv/4057/season/5/episode/15",
    },
  ],
  title: "Public Enemy",
  episodeType: "standard",
  stillPath: "/cPNHM4GhH5qt15YiTFWWsjqLfkg.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
