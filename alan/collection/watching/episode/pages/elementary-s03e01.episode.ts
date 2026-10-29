import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS03e01 = {
  id: "01a1887e-62a8-7397-9be7-66f2938195f5",
  type: "page-type/episode",
  slug: "elementary-s03e01",
  description:
    "Sherlock returns to New York with a new apprentice and a renewed interest in working with the NYPD after being fired by London’s MI6. However, Gregson won’t let him resume consulting for the department without permission from his former partner, Joan, the NYPD’s new go-to private investigator.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-3"],
  position: 1,
  publishedAt: "2014-10-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1001512",
      externalLink: "https://www.themoviedb.org/tv/1415/season/3/episode/1",
    },
  ],
  title: "Enough Nemesis to Go Around",
  episodeType: "standard",
  stillPath: "/hVJUqEiNNWFOIJMMencLHvtgQ9R.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
