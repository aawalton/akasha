import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e09 = {
  id: "01a18853-ac89-7c2c-b28b-fa23b8ff9aa4",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e09",
  description:
    "Stardate: 48642.5. The Voyager crew are offered luxurious shore leave by the advanced and gregarious Sikarians, who have a device that could send Voyager 40,000 light years closer to home. However, Sikarian law strictly prohibits sharing their technology with others.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 9,
  publishedAt: "1995-03-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112925",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/9",
    },
  ],
  title: "Prime Factors",
  episodeType: "standard",
  stillPath: "/3PAic27Yj8cCti7minJrm1vehT0.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
