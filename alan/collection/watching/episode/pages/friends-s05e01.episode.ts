import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS05e01 = {
  id: "01a18848-c2bf-7f56-a7ad-41e5467c3900",
  type: "page-type/episode",
  slug: "friends-s05e01",
  description:
    "In the aftermath of his Freudian slip, Ross tries to rescue his marriage with Emily.  Meanwhile, Chandler and Monica try and find a moment alone in order to continue their affair while overseas.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-5"],
  position: 1,
  publishedAt: "1998-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86534",
      externalLink: "https://www.themoviedb.org/tv/1668/season/5/episode/1",
    },
  ],
  title: "The One After Ross Says Rachel",
  episodeType: "standard",
  stillPath: "/cy99mz7wO24VK9j6x2fwT0AslMI.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
