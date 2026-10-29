import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e17 = {
  id: "01a1887f-e187-7bef-b681-56b3aedf08b6",
  type: "page-type/episode",
  slug: "star-trek-2-s01e17",
  description:
    "Encountering an uncharted planet in an empty region of space, Kirk and his crew are entertained by Trelane, a playful being who lacks the self-control to wield his great psionic powers with discipline.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 17,
  publishedAt: "1967-01-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13972",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/17",
    },
  ],
  title: "The Squire of Gothos",
  episodeType: "standard",
  stillPath: "/kAT0DEvi8rKsixqg75G9Stc7LHK.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
