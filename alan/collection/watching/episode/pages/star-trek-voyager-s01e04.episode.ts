import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e04 = {
  id: "01a18853-ac89-7ee6-95fc-99bc6a7450e1",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e04",
  description:
    "Stardate: 48532.4. During an away mission, Neelix is attacked and his lungs are surgically removed. His only hope for survival is if the crew of Voyager can get them back.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 4,
  publishedAt: "1995-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112909",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/4",
    },
  ],
  title: "Phage",
  episodeType: "standard",
  stillPath: "/sBRnt6h7C1uUq6IIcmBp3HlLU8i.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
