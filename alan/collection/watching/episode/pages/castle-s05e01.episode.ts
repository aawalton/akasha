import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS05e01 = {
  id: "01a1887e-1e41-7291-8f8e-ace75a8c45bc",
  type: "page-type/episode",
  slug: "castle-s05e01",
  description:
    "Picking up the morning after, Castle and Beckett now have to decide if they're a couple or was it just a onetime deal. But before they can tackle that, they must deal with those responsible for Kate's mother's death who are now a threat to Beckett.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-5"],
  position: 1,
  publishedAt: "2012-09-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64865",
      externalLink: "https://www.themoviedb.org/tv/1419/season/5/episode/1",
    },
  ],
  title: "After the Storm",
  episodeType: "standard",
  stillPath: "/m4sZ0ap0qJ8JRaERiIriETxf60M.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
