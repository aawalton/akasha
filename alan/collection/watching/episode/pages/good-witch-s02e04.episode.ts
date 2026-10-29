import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS02e04 = {
  id: "01a18849-3527-72f0-ae7a-be8b7727d60e",
  type: "page-type/episode",
  slug: "good-witch-s02e04",
  description:
    "Cassie can't help but feel upset after Grace admits she's been spending more time with Sam to replace the hurt she feels from the loss of her own late father.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-2"],
  position: 4,
  publishedAt: "2016-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1187212",
      externalLink: "https://www.themoviedb.org/tv/61864/season/2/episode/4",
    },
  ],
  title: "The Trouble with Love",
  episodeType: "standard",
  stillPath: "/i3ZE0ExJ58uHS4PV66kJhDEYgkg.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
