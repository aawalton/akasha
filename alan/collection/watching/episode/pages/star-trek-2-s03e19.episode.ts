import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e19 = {
  id: "01a1887f-e18a-71c0-af5d-19288d1224f3",
  type: "page-type/episode",
  slug: "star-trek-2-s03e19",
  description:
    "The crew of the Enterprise encounter an immortal human in this science fiction variation on Shakespeare's The Tempest.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 19,
  publishedAt: "1969-02-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14023",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/19",
    },
  ],
  title: "Requiem for Methuselah",
  episodeType: "standard",
  stillPath: "/udZ28usItv95iDU7rDRGlGCAIcU.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
