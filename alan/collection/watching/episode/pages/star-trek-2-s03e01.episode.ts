import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e01 = {
  id: "01a1887f-e189-7d03-bee6-84094e1497a7",
  type: "page-type/episode",
  slug: "star-trek-2-s03e01",
  description:
    "An alien female beams aboard the ship and, after incapacitating the rest of the crew, surgically removes Spock's brain. Kirk and the crew have just hours to locate and replace it before Spock's body dies.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 1,
  publishedAt: "1968-09-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14010",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/1",
    },
  ],
  title: "Spock's Brain",
  episodeType: "standard",
  stillPath: "/eDKdPc0yryVjCIQhOtjvHoOuyG3.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
