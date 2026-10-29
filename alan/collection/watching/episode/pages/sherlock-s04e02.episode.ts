import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sherlockS04e02 = {
  id: "01a1887f-adf0-7e29-914c-02ec7d40302d",
  type: "page-type/episode",
  slug: "sherlock-s04e02",
  description:
    "Sherlock faces perhaps the most chilling enemy of his long career: the powerful and seemingly unassailable Culverton Smith – a man with a very dark secret indeed.",
  ownLength: 89,
  ownProgress: 89,
  partOfCollections: ["season/sherlock-season-4"],
  position: 2,
  publishedAt: "2017-01-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1234466",
      externalLink: "https://www.themoviedb.org/tv/19885/season/4/episode/2",
    },
  ],
  title: "The Lying Detective",
  episodeType: "standard",
  stillPath: "/krz3V8MLoVKjMwCuAG2xxnx49TO.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:30:31.407Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Episode
