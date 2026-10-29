import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e16 = {
  id: "01a18853-ac8e-732d-9ccb-886bf3da763b",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e16",
  description:
    "Stardate: 51652.3. The crew rescues a critically injured but aggressive Hirogen hunter, who threatens to have his allies destroy Voyager if Janeway comes between him the hunt for his latest prey: a single creature from Species 8472.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 16,
  publishedAt: "1998-02-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113177",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/16",
    },
  ],
  title: "Prey",
  episodeType: "standard",
  stillPath: "/swW4QKlrQWrDWennvQKom2qKLAB.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
