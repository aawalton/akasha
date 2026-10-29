import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS01e07 = {
  id: "01a18853-07cd-709c-b3de-68c6185fae02",
  type: "page-type/episode",
  slug: "star-trek-picard-s01e07",
  description:
    "Picard and Soji transport to the planet Nepenthe, home to some old and trusted friends. As the rest of the La Sirena crew attempt to join them, Picard helps Soji make sense of her recently unlocked memories. Meanwhile, Hugh and Elnor are left on the Borg cube and must face an angered Narissa.",
  ownLength: 59,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-1"],
  position: 7,
  publishedAt: "2020-03-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2057382",
      externalLink: "https://www.themoviedb.org/tv/85949/season/1/episode/7",
    },
  ],
  title: "Nepenthe",
  episodeType: "standard",
  stillPath: "/il75QcllFnO1g0TGZzQ3ZzUrpH0.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
