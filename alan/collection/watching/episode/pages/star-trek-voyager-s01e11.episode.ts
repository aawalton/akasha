import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e11 = {
  id: "01a18853-ac89-7283-a856-d8d98c48f5b5",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e11",
  description:
    'Stardate: 48693.2. Harry Kim disappears from the holodeck during his holo-novel, "Beowulf." According to the characters, he died at the hands of a mystical beast known as "Grendel". When Chakotay and Tuvok also disappear, the Doctor is transferred to the holodeck to investigate.',
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 11,
  publishedAt: "1995-04-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112945",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/11",
    },
  ],
  title: "Heroes and Demons",
  episodeType: "standard",
  stillPath: "/fecKOFAWG5nChLDwlcUwvfjqUR1.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
