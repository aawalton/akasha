import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e15 = {
  id: "01a18853-ac8a-745b-8a3b-a89b5b3a59c7",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e15",
  description:
    "Stardate: 48846.5. In order to bring some rebellious Maquis crewmembers into line, Tuvok gives them a Starfleet Academy crash course. Meanwhile, the crew investigate a series of failures affecting the Voyager’s bio-neural systems.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 15,
  publishedAt: "1995-05-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112954",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/15",
    },
  ],
  title: "Learning Curve",
  episodeType: "finale",
  stillPath: "/7nfLh1IpwKlSZ38sqE8m1gjErrS.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
