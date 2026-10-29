import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e18 = {
  id: "01a1887f-e18a-79a4-88dd-a85a9ea90691",
  type: "page-type/episode",
  slug: "star-trek-2-s03e18",
  description: "Strange incorporeal aliens threaten the Memory Alpha station and the Enterprise.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 18,
  publishedAt: "1969-01-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14028",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/18",
    },
  ],
  title: "The Lights of Zetar",
  episodeType: "standard",
  stillPath: "/fxkgBPOc6Fvwmphnvh3mDLnmuAO.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
