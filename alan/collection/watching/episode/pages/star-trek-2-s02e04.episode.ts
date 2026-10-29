import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e04 = {
  id: "01a1887f-e188-70a4-8284-5eed11bf67c9",
  type: "page-type/episode",
  slug: "star-trek-2-s02e04",
  description:
    "A transporter mishap swaps Captain Kirk and his companions with their evil counterparts in a parallel universe. In the so-called Mirror Universe, the Enterprise is a ship of the Terran Empire, an organization as evil as the United Federation of Planets is benevolent.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 4,
  publishedAt: "1967-10-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13983",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/4",
    },
  ],
  title: "Mirror, Mirror",
  episodeType: "standard",
  stillPath: "/ik6XXw88V59NcAF3SCTHzlc8UeW.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
