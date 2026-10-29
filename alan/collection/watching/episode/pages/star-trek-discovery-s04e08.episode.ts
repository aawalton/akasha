import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS04e08 = {
  id: "01a18852-a9f7-74fa-93a2-e455fdc67cd9",
  type: "page-type/episode",
  slug: "star-trek-discovery-s04e08",
  description:
    "Following a hunch, Captain Burnham tracks Book to an old haunt from their courier days and gets drawn into a high-stakes competition for a powerful weapon.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-4"],
  position: 8,
  publishedAt: "2022-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3396838",
      externalLink: "https://www.themoviedb.org/tv/67198/season/4/episode/8",
    },
  ],
  title: "All In",
  episodeType: "standard",
  stillPath: "/bsXxuEJnwrycdWnFIhlQ2KoGslt.jpg",
  voteAverage: 5.2,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
