import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e10 = {
  id: "01a1887f-e186-7e47-810e-f7f5304a53b4",
  type: "page-type/episode",
  slug: "star-trek-2-s01e10",
  description:
    "Threatened by the sinister captain of a powerful alien vessel, Kirk claims that the Enterprise carries a powerful explosive which will destroy both ships. The move produces unexpected actions from the alien adversary.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 10,
  publishedAt: "1966-11-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13963",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/10",
    },
  ],
  title: "The Corbomite Maneuver",
  episodeType: "standard",
  stillPath: "/5vsGcrzFvwdVTLZbfD0d996W9Su.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
