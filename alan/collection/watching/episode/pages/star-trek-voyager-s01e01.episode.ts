import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e01 = {
  id: "01a18853-ac89-7123-851e-ee4a8dd91455",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e01",
  description:
    "Stardate: 48315.6. The USS Voyager, led by Captain Kathryn Janeway, is sent into the dangerous Badlands in pursuit of a Maquis ship, only for both ships to find themselves 70,000 light years from home in the uncharted Delta Quadrant.",
  ownLength: 92,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 1,
  publishedAt: "1995-01-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112854",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/1",
    },
  ],
  title: "Caretaker",
  episodeType: "standard",
  stillPath: "/o4YZxBYdVLswbGTF1s3NCgkRkbh.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
